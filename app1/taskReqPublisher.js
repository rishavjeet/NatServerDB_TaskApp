const { randomBytes } = require('crypto');
const nats = require('node-nats-streaming');
const taskReqPublisher = async (req,res,next)=>{
    let task;
    const stan = nats.connect('trialCluster',randomBytes(4).toString('hex'),{
        url:'http://localhost:4222'
    });
    stan.on('connect',()=>{
        console.log('taskReqPublisher Connected to NATS');
        stan.publish('task-req',JSON.stringify(req.body),()=>{
            console.log('task req sent');
        });
        // const options = stan.subscriptionOptions().setManualAckMode(true);
        const subscription = stan.subscribe('task-req-res');
        subscription.on('message', (msg)=>{
            task = JSON.parse(msg.getData());
            console.log(task);
            req.task = task;
        });
        next();
    });
    
}
module.exports = taskReqPublisher;