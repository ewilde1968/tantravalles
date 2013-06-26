
/*
 * Character model
*/

module.exports = Character;

function Character( characterName, ownerId) {
    this.name = characterName;
    this.owner = ownerId;
}
