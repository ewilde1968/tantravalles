
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Encounter = require('./encounter'),
    Map = require('./map');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    characters: [Creature.schema],
    maps:       [Map.schema],
    settings:   Object,
    encounters: [Encounter.schema],
    state:      String
});


GameSchema.statics.factory = function( settings, characters, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings,
                           state:'initial'
                          });

    var width = settings.width, height = settings.height;
    var map = Map.factory( width, height);
    result.maps.push( map);

    Encounter.find({difficulty:settings.difficulty,
                    minsize:{$lte:width*height},
                    template:true
                   },
                   function(err,encounters) {
                       if(err) return err;

                       encounters.forEach( function(e) {
                           result.encounters.push( e.clone());
                       });
                       map.scatterEncounters( result.encounters);

                       characters.forEach( function(cName, index, arr) {
                           Creature.fromTemplate( cName, function(err,character) {
                               if(err) return err;
                               result.characters.push( character);
                               
                               if( (index + 1) == arr.length) {
                                   result.save( function(err,game) {
                                       if( err) return err;
                                       if(cb) cb(err,game);
                                   });
                               }
                           });
                       });
                   });
};

GameSchema.statics.update = function() {
};

GameSchema.methods.socketSendBack = function(newState,data,callback) {
    if( !!newState)
        this.state = newState;
    data.state = this.state;
    
    this.save( function(err,g) {
        if(err) return next(err);
        if( callback) callback(data)
    });
};

GameSchema.methods.getTileIndex = function(encounter) {
    for(var index=0;index<this.maps.length;index++) {
        var result = this.maps[index].getTileIndex(encounter);
        if( result != -1)
            return result;
    };
    
    return -1;
};


var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
