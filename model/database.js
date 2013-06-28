
/*
 * Database Utility Routes
 */
module.exports = Database;

var mongoose = require('mongoose'),
    defaultObjects = require('./defaultObjects'),
    Item = require('./item'),
    Creature = require('./creature'),
    Encounter = require('./encounter');

var connected = false;
function Database () {
    if( !connected)
        mongoose.connect('mongodb://127.0.0.1/tantravalles');
    connected = true;
    
    return this;
};

var enumerateTemplateArray = function(dest,input,type,cb) {
    if( !!input) {
        input.forEach( function(o,i,a) {
            type.fromTemplate(o, function(err,obj) {
                if(err) return err;
                
                dest.push(obj);
                if(dest.length == input.length && cb)
                    cb(err);
            });
        });
    } else
        if(cb) cb(null);
};

var initEncounters = function(cb) {
    var result = new Array();
    defaultObjects.encounters.forEach( function(e,ei,ea) {
        e.template = true;
        
        var items = e.items;
        delete e.items;
        
        var creatures = e.creatures;
        delete e.creatures;
        
        var realDeal = new Encounter(e);
        enumerateTemplateArray( realDeal.items, items, Item, function(err) {
            if( err) return err;
            enumerateTemplateArray( realDeal.creatures, creatures, Creature, function(err) {
                if( err) return err;
                result.push( realDeal);

                if( defaultObjects.encounters.length == result.length)
                    Encounter.create(result, cb);
            });
        });
    });
};

var initCreatures = function(cb) {
    var result = new Array();
    defaultObjects.creatures.forEach( function(e,i,a) {
        e.template = true;
        
        var items = e.items;
        delete e.items;

        var realDeal = new Creature(e);
        enumerateTemplateArray( realDeal.items, items, Item, function(err) {
            if( err) return err;
            result.push( realDeal);
            if( defaultObjects.creatures.length == result.length)
                Creature.create(result, cb);
        });
    });
};

var initItems = function(cb) {
    var result = new Array();
    defaultObjects.items.forEach( function(e) {
        e.template = true;
        var realDeal = new Item(e);
        result.push( realDeal);
    });

    Item.create(result, cb);
};

Database.prototype.initialize = function() {
    // see if the database is setup properly and, if not, initialize
    Item.findOne({template:true}, 'name', function(err,doc) {
        if( err) return err;

        if(!!doc === false) {
            // the database is not set up
            initItems( function() {
                initCreatures( function() {
                    initEncounters( function() {
                    });
                });
            });
        }
    });
};
