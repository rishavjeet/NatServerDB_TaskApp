const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    tasks:[{
        taskname:{
        type:String
        },
        taskDesc:{
            type:String,
        },
        completed:{
            type:Boolean,
        }
    }],
},{
    timestamps:true
});
const userModel = new mongoose.model('taskInfo',taskSchema);
module.exports = userModel;