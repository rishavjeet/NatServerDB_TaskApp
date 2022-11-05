const { randomBytes } = require('crypto');
const nats = require('node-nats-streaming');
const userModel = require('./Models/userModel');
require('./config/mongoConnect');
const stan = nats.connect('trialCluster',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
});
stan.on('connect',()=>{
    console.log('Listener connected to NATS');
    const option = stan.subscriptionOptions().setManualAckMode(true);
    const subscription = stan.subscribe('user-info','user-queue-group',option);
    subscription.on('message',async (msg)=>{
        const data = JSON.parse(msg.getData());
        console.log(typeof data);
        console.log(`Data received: ${data} with sequence no: ${msg.getSequence()}`);
        const newUser = new userModel(data);
        const registeredUser = await newUser.save();
        msg.ack();
    })
});