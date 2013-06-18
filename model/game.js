
/*
 * Game model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GameSchema = new Schema( {
    owner:      { type:ObjectId, required:true }
});


GameSchema.statics.create = function( settings, character, ownerId, cb) {
};

GameSchema.statics.update = function() {
};

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
