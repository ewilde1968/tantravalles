
/*
 * Item model
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ItemSchema = new Schema( {
    template:       { type:Boolean, index:true },
    name:           { type:String, required:true, index:true },
    size:           { type:Number, required:true },
    sharpness:      Number,
    speed:          Number,
    length:         Number,
    owner:          ObjectId
});

ItemSchema.statics.sizeValues = ['tiny','small','medium','large','tremendous'];

ItemSchema.statics.fromTemplate = function( templateName, cb) {
    Item.findOne({template:true,name:templateName}, function(err,doc) {
        if(err) return err;
        
        if( doc) {
            var result = doc.toObject();
            delete result.template;
            cb( err, new Item( result));
        } else
            cb( err, doc);
    });
};

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;