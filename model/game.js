
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
    settings:   Object
});


GameSchema.statics.factory = function( settings, characters, ownerId, cb) {
    var result = new Game({owner:ownerId,
                           settings:settings
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

                       map.scatterEncounters(encounters);

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

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
