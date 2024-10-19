const mongoose = require('mongoose')
const schema= mongoose.Schema;

const attributeFeatureCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const AttributeFeatureCounter = mongoose.model('AttributeFeatureCounter', attributeFeatureCounterSchema);

async function getNextAttributeFeatureId() {
    const result = await AttributeFeatureCounter.findByIdAndUpdate(
        'attributeFeature', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const attributeFeatureSchema = new schema({
    attributeFeatureId: {
        type: Number,
        unique: true,
        index: true,
    },
    name: 
    { 
        type: String,
        required: true 
    }, 
});

attributeFeatureSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextAttributeFeatureId();
            this.attributeFeatureId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
}
);

const AttributeFeatureSchema = mongoose.model('AttributeFeature', attributeFeatureSchema);
module.exports = AttributeFeatureSchema;
