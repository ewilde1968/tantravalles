
/*
 * Map model
*/

module.exports = Map;

var terrainTypes = ['forest','mountain','valley','special'];
var spriteVerticalRoot = 0;
var spriteSize = 16;

function Map( width, height) {
    this.tiles = new Array( width * height);
    this.width = width;
    this.height = height;

    for( var y = 0; y < height; y++) {
        var rootIndex = y*width;
        var nextIndex = (y+1) < height ? (y+1)*width : 0;
        for( var x = 0; x < width; x++) {
            var index = rootIndex + x;
            if( typeof this.tiles[ index] !== 'number')
                this.tiles[index] = 0xf;  // all paths possible on first tile
            
            // choose paths
            var paths = Math.floor(Math.random() * 16) & this.tiles[index];
            
            // set adjacent tile path masks, only valid for south and east
            if( !!nextIndex === true) {
                if( paths & 0x8)
                    this.tiles[ nextIndex + x] = 0xf;
                else
                    this.tiles[ nextIndex + x] = 0xd; // no north path allowed
            }
            if( (x+1) != width && !!(paths & 0x4) === false)
                this.tiles[ index + 1] &= 0xb; // no west path allowed
            
            // choose terrain
            var terrain = Math.floor(Math.random() * terrainTypes.length);
            
            // calculate the index into the sprite list
            var spriteVerticalOffset = (terrain + spriteVerticalRoot) * spriteSize;
            var spriteHorizontalOffset = paths * spriteSize;
            var spriteOffset = spriteHorizontalOffset + 'px ' + spriteVerticalOffset + 'px';
            
            // set tile object
            this.tiles[index] = {terrain:terrain,
                                 paths:paths,
                                 enchanted:false,
                                 spriteIndex:spriteOffset
                                };
        }
    }
}
