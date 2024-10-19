const mongoose = require('mongoose')
const schema= mongoose.Schema;

const vehicleAttributeCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const VehicleAttributeCounter = mongoose.model('VehicleAttributeCounter', vehicleAttributeCounterSchema);

async function getNextAttributeId() {
    const result = await VehicleAttributeCounter.findByIdAndUpdate(
        'vehicleAttribute', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleAttributeSchema = new schema({
    attributeId: {
        type: Number,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    attributeFeatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttributeFeature',
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleCategory',
    },
}, {
    timestamps: true
})

vehicleAttributeSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextAttributeId();
            this.attributeId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
}
);

const VehicleAttributeSchema = mongoose.model('VehicleAttribute', vehicleAttributeSchema);

module.exports = VehicleAttributeSchema;