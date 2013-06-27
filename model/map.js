
/*
 * Map model
*/
var Tile = require('./tile');

module.exports = Map;

Map.prototype.initMap = function(width, height) {
    for( var y = 0; y < height; y++) {
        var rootIndex = y*width;
        var nextRowIndex = ((y+1) < height) ? (y+1)*width : 0;
        for( var x = 0; x < width; x++) {
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
            if( (x+1) != width) {
                if( typeof this.tiles[index+1] !== 'number')
                    this.tiles[index+1] = 0xf;  // first row
                if( paths & 0x1)
                    this.tiles[index+1] |= 0x40;    // west path required
                else
                    this.tiles[index+1] &= 0xfb;    // no west path allowed
            }
            
            // choose terrain, > Tile.terrainTypes.length means copy an adjacent terrain type
            var terrain = Math.floor(Math.random() * (Tile.terrainTypes.length + 3));
            if( terrain > Tile.terrainTypes.length) {
                var tileToCopy = terrain - Tile.terrainTypes.length;
                if( tileToCopy === 1) {
                    if( index > width && x > 0)
                        terrain = this.tiles[index - width - 1].terrain;
                    else
                        terrain -= 3;
                } else if( tileToCopy === 2) {
                    if( index >= width)
                        terrain = this.tiles[index - width].terrain;
                    else
                        terrain -= 3;
                } else {
                    if( x > 0)
                        terrain = this.tiles[index - 1].terrain;
                    else
                        terrain -= 3;
                }
            }
            
            // set tile object
            this.tiles[index] = new Tile( terrain, paths);
        }
    }
};

function Map( width, height) {
    this.tiles = new Array( width * height);
    this.width = width;
    this.height = height;

    this.initMap(width,height);
}
