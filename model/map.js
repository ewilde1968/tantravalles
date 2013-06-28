
/*
 * Map model
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Encounter = require('./encounter'),
    Tile = require('./tile');

var MapSchema = new Schema( {
    tiles:      [Tile.schema],
    width:      Number,
    height:     Number
});

MapSchema.statics.factory = function(width, height) {
    var result = new Map({width:width,height:height});
    if( result)
        result.initMap();
    
    return result;
}

MapSchema.methods.initMap = function() {
    for( var y = 0; y < this.height; y++) {
        var rootIndex = y*this.width;
        var nextRowIndex = ((y+1) < this.height) ? (y+1)*this.width : 0;
        for( var x = 0; x < this.width; x++) {
            // before selecting a tile, each tile has a bitfield indicating
            // path requirements
            //    bits 7-4: swne must have path
            //    bits 3-0: swne cannot have path
            var index = rootIndex + x;
            if( typeof this.tiles[ index] !== 'number')
                this.tiles[index] = 0xf;  // first row
            
            // choose paths
            var paths = Math.floor(Math.random() * 16) & this.tiles[index]; // mask off no paths
            paths |= (this.tiles[index] >> 4) & 0xf;    // mask on required paths
            
            // set adjacent tile path masks, only valid for south and east
            if( !!nextRowIndex === true) {
                if( paths & 0x8)
                    this.tiles[ nextRowIndex + x] = 0x2f;   // north path required
                else
                    this.tiles[ nextRowIndex + x] = 0xd; // no north path allowed
            }
            if( (x+1) != this.width) {
                if( typeof this.tiles[index+1] !== 'number')
                    this.tiles[index+1] = 0xf;  // first row
                if( paths & 0x1)
                    this.tiles[index+1] |= 0x40;    // west path required
                else
                    this.tiles[index+1] &= 0xfb;    // no west path allowed
            }
            
            // choose terrain, > Tile.terrainTypes.length means copy an adjacent terrain type
            var terrain = Math.floor(Math.random() * (Tile.terrainTypes.length + 3));
            if( terrain >= Tile.terrainTypes.length) {
                var tileToCopy = terrain - Tile.terrainTypes.length;
                if( tileToCopy === 0) {
                    if( index > this.width && x > 0)
                        terrain = this.tiles[index - this.width - 1].terrain;
                    else
                        terrain -= Tile.terrainTypes.length;
                } else if( tileToCopy === 1) {
                    if( index >= this.width)
                        terrain = this.tiles[index - this.width].terrain;
                    else
                        terrain -= Tile.terrainTypes.length;
                } else {
                    if( x > 0)
                        terrain = this.tiles[index - 1].terrain;
                    else
                        terrain -= Tile.terrainTypes.length;
                }
            }
            
            // set tile object
            this.tiles[index] = Tile.factory( terrain, paths);
        }
    }
};

MapSchema.methods.scatterEncounters = function( encounters) {
    // sort tiles by terrain type in random order
    var sortedA = new Array( Tile.terrainTypes.length);
    Tile.terrainTypes.forEach( function(e,i) {sortedA[i] = new Array();});
    this.tiles.forEach( function(e) {
        var arr = sortedA[e.terrain];
        arr.splice( Math.floor(Math.random()*arr.length), 0, e);
    });
    
    // walk through encounters and assign to tiles
    encounters.forEach( function(e) {
        var terrain = Tile.terrainTypes.indexOf(e.terrain);
        
        if( terrain != -1) {
            var tile = sortedA[terrain].shift();
            tile.addEncounter( e);
        }
    });
};


var Map = mongoose.model('Map', MapSchema);
module.exports = Map;
