const mongoose = require('mongoose');
const { Schema } = mongoose;

const featureCounterSchema = new Schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const FeatureCounter = mongoose.model('FeatureCounter', featureCounterSchema);

async function getNextFeatureId() {
    const result = await FeatureCounter.findByIdAndUpdate(
        'feature', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleFeaturesSchema = new Schema({
    featureId: {
        type: Number,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true  
});

vehicleFeaturesSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextFeatureId();
            this.featureId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
});

const VehicleFeatures = mongoose.model('VehicleFeatures', vehicleFeaturesSchema);

module.exports = VehicleFeatures;
