
/*
 * Tile model
*/
module.exports = Tile;

Tile.terrainTypes = ['forest','mountain','valley','special'];
var spriteSize = 16;

Tile.prototype.calculateMapSpriteOffset = function() {
    // calculate the index into the sprite list
    var spriteVerticalOffset = (this.terrain + (this.enchanted?1:0) * Tile.terrainTypes.length) * spriteSize * -1;
    var spriteHorizontalOffset = this.paths * spriteSize * -1;

    return spriteHorizontalOffset + 'px ' + spriteVerticalOffset + 'px';
};

function Tile( terrain, paths) {
    this.terrain = terrain % Tile.terrainTypes.length;
    this.paths = paths;
    this.enchanted = false;
    this.spriteIndex = this.calculateMapSpriteOffset(paths,terrain,false);
}
