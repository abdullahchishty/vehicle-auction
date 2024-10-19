const mongoose = require('mongoose')
const schema= mongoose.Schema;

const verifyUserSchema = new schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hash:{
        type:String,
        required:true,
    }
})

const VerifyUserSchema = mongoose.model('VerifyUser', verifyUserSchema);

module.exports = VerifyUserSchema;