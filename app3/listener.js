const nats = require('node-nats-streaming');
const {randomBytes} = require('crypto');
require('./config/connectMongo');
const taskModel = require('./Models/taskModel');
const userModel = require('./Models/taskModel');
const stan = nats.connect('trialCluster',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
});
stan.on('connect',()=>{
    console.log('listener of app3 connected to NATS');
    const options = stan.subscriptionOptions().setManualAckMode(true);


    const subscription1 = stan.subscribe('user-info');
    subscription1.on('message',async (msg)=>{
        const data = JSON.parse(msg.getData());
        const newUser = new userModel({
            username:data.username,
            email:data.email,
        });
        const registeredUser = await newUser.save();
        console.log(data);
        msg.ack();
    });



    const subscription2 = stan.subscribe('task-info');
    subscription2.on('message',async (msg)=>{
        const data = JSON.parse(msg.getData());
        const user = await taskModel.find({email:data.email});
        const _id = user[0]._id.toString();
        const res = await taskModel.findByIdAndUpdate({_id},{
            $push:{
                tasks: {
                    taskname:data.taskname,
                    taskDesc:data.taskDesc,
                    completed:data.completed
                }
            }
        },{
            new: true,
            useFindAndModify:false,
        });
        console.log(res);
    });



    const subscription3 = stan.subscribe('task-req');
    subscription3.on('message',async (msg)=>{
        const data = JSON.parse(msg.getData());
        console.log(data);
        const user = await userModel.find({email:data.email});
        const taskList = user[0].tasks;
        console.log(taskList);
        stan.publish('task-req-res',JSON.stringify(taskList),()=>console.log('Respond sent back'));
    });



    const subscription4 = stan.subscribe('task-mod');
    subscription4.on('message',async (msg)=>{
        const data = JSON.parse(msg.getData());
        console.log(data);
        const user = await userModel.find({email:data.email});
        const _id = user[0]._id.toString();
        const taskList = user[0].tasks;
        const modTask = taskList.find((task)=>task.taskname===data.oldTaskName);
        const modIndex = taskList.findIndex((task)=>task.taskname===data.oldTaskName);
        modTask.taskname = data.newTaskName;
        taskList.splice(modIndex,1,modTask);
        const res = await userModel.findByIdAndUpdate({_id},{
            $set:{
                tasks:taskList
            }
        },{
            new:true,
            useFindAndModify:true,
        });
        console.log(res);
        stan.publish('task-mod-res',JSON.stringify(res),()=>console.log("Mod Response sent Back"));
    })
})