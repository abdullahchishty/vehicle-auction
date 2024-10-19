const mongoose = require('mongoose')
const schema= mongoose.Schema;

const modelCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const ModelCounter = mongoose.model('ModelCounter', modelCounterSchema);

async function getNextModelId() {
    const result = await ModelCounter.findByIdAndUpdate(
        'model', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleModelSchema = new schema({
    modelId: {
        type: Number,
        unique: true,
        index: true,
    },
    model: {
        type: String,
        required: true,
    },
    make: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleMake',
        required: true,
    },
}, {
    timestamps: true
})

vehicleModelSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextModelId();
            this.modelId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
}
);

const VehicleModelSchema = mongoose.model('VehicleModel', vehicleModelSchema);

module.exports = VehicleModelSchema;