const { randomBytes } = require('crypto');
const nats = require('node-nats-streaming');
const taskModPublisher = (data)=>{
    const stan = nats.connect('trialCluster',randomBytes(4).toString('hex'),{
        url:'http://localhost:4222'
    });
    stan.on('connect',()=>{
        console.log('taskModPublisher connected to NATs');
        stan.publish('task-mod',JSON.stringify(data),()=>console.log('Mod Req sent'));
        

        const subscription = stan.subscribe('task-mod-res');
        subscription.on('message',(msg)=>{
            const data = JSON.parse(msg.getData());
            console.log(data);
        })
    });   
}
module.exports = taskModPublisher;