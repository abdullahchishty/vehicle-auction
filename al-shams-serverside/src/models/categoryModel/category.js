const mongoose = require('mongoose')
const schema= mongoose.Schema;

const categoryCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const CategoryCounter = mongoose.model('CategoryCounter', categoryCounterSchema);

async function getNextCategoryId() {
    const result = await CategoryCounter.findByIdAndUpdate(
        'category', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const vehicleCategorySchema = new schema({
    categoryId: {
        type: Number,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    parentCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleCategory',
        default: null
    },
    attributes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleAttribute',
    }],
}, {
    timestamps: true
})

vehicleCategorySchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextCategoryId();
            this.categoryId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
}
);

const VehicleCategorySchema = mongoose.model('VehicleCategory', vehicleCategorySchema);

module.exports = VehicleCategorySchema;