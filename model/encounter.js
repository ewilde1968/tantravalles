
/*
 * Encounter model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Creature = require('./creature'),
    Item = require('./item');

var EncounterSchema = new Schema( {
    template:       { type:Boolean, index:true },
    difficulty: { type:String, required:true, index:true },
    minsize:    { type:Number, required:true, index:true },
    name:       { type:String, required:true, index:true },
    terrain:    { type:String, required:true },
    creatures:  [Creature.schema],
    items:      [Item.schema],
    dwellings:  Array
});

EncounterSchema.statics.fromTemplate = function( templateName, cb) {
    Encounter.findOne({template:true,name:templateName}, function(err,doc) {
        if(err) return err;
        
        if( doc) {
            cb( err, doc.clone());
        } else
            cb( err, doc);
    });
};

EncounterSchema.methods.clone = function() {
    var plainObject = this.toObject();
    if( plainObject.template) delete plainObject.template;
    
    return new Encounter( plainObject);
};

EncounterSchema.methods.addCreature = function(creature) {
    if( creature) this.creatures.push(creature);
};


var Encounter = mongoose.model('Encounter', EncounterSchema);
module.exports = Encounter;