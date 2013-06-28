
/*
 * Creature model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Item = require('./item');

var CreatureSchema = new Schema( {
    template:       Boolean,
    name:           { type:String, required:true, index:true },
    size:           { type:Number, required:true },
    agility:        { type:Number, required:true },
    speed:          { type:Number, required:true },
    strength:       { type:Number, required:true },
    hitpoints:      { type:Number, required:true },
    items:          [Item.schema]
});

var strValues = ['tiny','small','medium','large','tremendous'];

CreatureSchema.statics.fromTemplate = function( templateName, cb) {
    Creature.findOne({template:true,name:templateName}, function(err,doc) {
        if(err) return err;
        
        if( doc) {
            var result = doc.toObject();
            delete result.template;
            cb( err, new Creature( result));
        } else
            cb( err, doc);
    });
};

var Creature = mongoose.model('Creature', CreatureSchema);
module.exports = Creature;