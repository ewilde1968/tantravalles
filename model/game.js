
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Character = require('./character'),
    Map = require('./map');

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true },
    characters: Array,
    maps:       Array
});


GameSchema.statics.factory = function( settings, characterName, ownerId, cb) {
    var character = new Character( characterName, ownerId);
    var characterA = new Array( character);
    var map = new Map( 32, 32);
    var mapA = new Array( map);

    var result = new Game({owner:ownerId,
                           characters:characterA,
                           maps:mapA
                          });
    result.save( function(err,game) {
        if(err) {
            delete characterA;
            delete character;
            delete mapA;
            delete map;
        }
        if(cb) cb(err,game);
    });
};

GameSchema.statics.update = function() {
};

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
