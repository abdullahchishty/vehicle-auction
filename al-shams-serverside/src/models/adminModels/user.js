const mongoose = require('mongoose')
const schema= mongoose.Schema;
const bcrypt=require('bcryptjs');

const userSchema = new schema({
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true,
    },
    salt:{
        type:String,
        required:true,
    },
})

userSchema.methods.generateHash = function (salt, password) {
  return bcrypt.hashSync(salt + password, 10);
};

userSchema.methods.validPassword = function (salt, userpassword) {
  return bcrypt.compareSync(salt + userpassword, this.password);
};

const User = mongoose.model('Admin', userSchema);

module.exports = User;