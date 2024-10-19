const mongoose = require('mongoose')
const schema= mongoose.Schema;
const bcrypt=require('bcryptjs');

const userCounterSchema = new schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const UserCounter = mongoose.model('UserCounter', userCounterSchema);

async function getNextUserId() {
    const result = await UserCounter.findByIdAndUpdate(
        'user', 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result.seq;
}

const userSchema = new schema({
    userId: {
        type: Number,
        unique: true,
        index: true,
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    password:{
        type:String,
    },
    salt:{
        type:String,
    },
    verified:
    { 
        type: Boolean,
        default: false
    },
})

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {  
            const nextId = await getNextUserId();
            this.userId = nextId; 
        }
        next(); 
    } catch (err) {
        next(err); 
    }
}
);

userSchema.methods.generateHash = function (salt, password) {
  return bcrypt.hashSync(salt + password, 10);
};

userSchema.methods.validPassword = function (salt, userpassword) {
  return bcrypt.compareSync(salt + userpassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;