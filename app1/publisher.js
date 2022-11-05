const nats = require('node-nats-streaming');
const {randomBytes} = require('crypto');
const express = require('express');
const publisher = (data)=>{
    console.clear();
    const stan = nats.connect('trialCluster',randomBytes(4).toString('hex'),{
        url:'http://localhost:4222'
    });
    stan.on('connect',()=>{
        console.log('publisher connected to NATS');
        const userData=JSON.stringify(data);
        stan.publish('user-info',userData,()=>{
            console.log(data);
            console.log('Data Sent to Server');
        });
    });
}
module.exports = publisher;