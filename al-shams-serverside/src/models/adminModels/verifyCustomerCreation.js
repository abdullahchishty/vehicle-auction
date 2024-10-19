const mongoose = require('mongoose')
const schema= mongoose.Schema;

const verifyUserSchema = new schema({
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
})

const VerifyUserSchema = mongoose.model('VerifyCustomerCreation', verifyUserSchema);

module.exports = VerifyUserSchema;