
/*
 * Tile model
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Item = require('./item'),
    Encounter = require('./encounter');

var TileSchema = new Schema( {
    terrain:        Number,
    paths:          Number,
    enchanted:      Boolean,
    encounters:     [Encounter.schema],
    spriteIndex:    String
});

TileSchema.statics.terrainTypes = ['forest','mountain','valley','special'];

var spriteSize = 16;
var calculateMapSpriteOffset = function(paths,terrain,enchanted) {
    // calculate the index into the sprite list
    var spriteVerticalOffset = (terrain + (enchanted?1:0) * Tile.terrainTypes.length) * spriteSize * -1;
    var spriteHorizontalOffset = paths * spriteSize * -1;

    return spriteHorizontalOffset + 'px ' + spriteVerticalOffset + 'px';
};

TileSchema.statics.factory = function( terrain, paths) {
    var result = new Tile( {terrain:terrain,
                            paths:paths,
                            enchanted:false,
                            spriteIndex:calculateMapSpriteOffset(paths,terrain,false)
                           });
    return result;
};

TileSchema.methods.addEncounter = function(encounter) {
    if( !!encounter === false)
        return;

    this.encounters.push( encounter.clone());
};


var Tile = mongoose.model( 'Tile', TileSchema);
module.exports = Tile;