const mongoose = require('mongoose')
const schema= mongoose.Schema;

const makeCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const MakeCounter = mongoose.model('MakeCounter', makeCounterSchema);

async function getNextMakeId() {
    const result = await MakeCounter.findByIdAndUpdate(
        'make', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleMakeSchema = new schema({
    makeId: {
        type: Number,
        unique: true,
        index: true,
    },
    make: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: {
            values: ['car', 'machinery'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },
    models: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleModel',
    }],
    image: {
        type: String,
    }
}, {
    timestamps: true
})

vehicleMakeSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextMakeId();
            this.makeId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
});

const VehicleMakeSchema = mongoose.model('VehicleMake', vehicleMakeSchema);

module.exports = VehicleMakeSchema;