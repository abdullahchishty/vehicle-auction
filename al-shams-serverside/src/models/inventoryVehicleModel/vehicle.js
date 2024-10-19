const mongoose = require('mongoose')
const schema= mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const vehicleCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const VehicleCounter = mongoose.model('VehicleCounter', vehicleCounterSchema);

async function getNextVehicleId() {
    const result = await VehicleCounter.findByIdAndUpdate(
        'vehicle',
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleInventorySchema = new schema({
    VEHICLE_Id: {
        type: Number,
        unique: true,
        index: true,
    },
    MARKA_NAME: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleMake',
    },
    MODEL_NAME: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleModel',
    },
    YEAR: {
        type: Number,
    },
    VERSION: {
        type: String,
    },
    REGISTER_YEAR: {
        type: Number,
    },
    COLOR: {
        type: String,
    },
    MILEAGE: {
        type: Number,
    },
    PRICE: {
        type: Number,
    },
    ENGINE_NUMBER: {
        type: String,
    },
    CHASSIS_NUMBER: {
        type: String,
    },
    CONDITION: {
        type: String,
        enum: {
            values: ['new', 'used'],
            message: '{VALUE} is not supported'
        },
    },
    TRANSMISSION: {
        type: String,
        enum: {
            values: ['manual', 'automatic'],
            message: '{VALUE} is not supported'
        },
    },
    VERIFIED_AUCTION_SHEET: {
        type: Boolean,
        default: false
    },
    AUCTION_SHEET:{
        type: String,
    },
    DESCRIPTION: {
        type: String,
    },
    IMAGES: {
        type: [String],
    },
    FEATURES: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'VehicleFeatures',
    },
    LENGTH: {
        type: Number,
    },
    WIDTH: {
        type: Number,
    },
    HEIGHT: {
        type: Number,
    },
    WIDTH_INCLUDING_MIRROR: {
        type: Number,
    },
    WHEEL_BASE: {
        type: Number,
    },
    GROSS_WEIGHT: {
        type: Number,
    },
    LUGGAGE_CAPACITY: {
        type: Number,
    },
    MAX_LOADING_WEIGHT: {
        type: Number,
    },
    NO_OF_SEATS: {
        type: Number,
    },
    FUEL_TANK_CAPACITY: {
        type: Number,
    },
    MINIMUM_KERB_WEIGHT: {
        type: Number,
    },
    MAX_TOW_WEIGHT: {
        type: Number,
    },
    TURNING_CIRCLE: {
        type: Number,
    },
    MAX_TOWING_WEIGHT_BRAKED: {
        type: Number,
    },
    MAX_TOWING_WEIGHT_UNBRAKED: {
        type: Number,
    },
    FUEL_TYPE: {
        type: String,
    },
    COUNTRY: {
        type: String,
    },
    CATEGORY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleCategory',
    },
    SUB_CATEGORY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleCategory',
    },
    ATTRIBUTE: [{
        attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VehicleAttribute',
        },
        features: [{
            feature: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AttributeFeature',
            },
            value: {
                type: String,
            }
        }]
    }],
}, {
    timestamps: true
})

vehicleInventorySchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const nextId = await getNextVehicleId();
            this.VEHICLE_Id = nextId;
        }
        next();
    } catch (err) {
        next(err);
    }
}
);

vehicleInventorySchema.plugin(mongoosePaginate);

const VehicleInventorySchema = mongoose.model('VehicleInventory', vehicleInventorySchema);

module.exports = VehicleInventorySchema;