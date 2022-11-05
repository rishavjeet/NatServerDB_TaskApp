const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    contact:{
        type:Number,
        required: true,
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});
const userModel = new mongoose.model('userInfo',userSchema);
module.exports = userModel;