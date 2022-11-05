const express = require('express');
const publisher = require('./publisher');
const taskPublisher = require('./taskPublisher');
const taskReqPublisher = require('./taskReqPublisher');
const taskModPublisher = require('./taskModPublisher');
const app = express();
app.use(express.json());
app.post('/newUser',(req,res)=>{
    const userInfo = req.body;
    publisher(userInfo);
    res.status(201).send({status:' user OK'});
});


app.post('/newTask',(req,res)=>{
    const taskInfo = req.body;
    taskPublisher(taskInfo);
    res.status(201).send({status:'task OK'})
});

app.get('/getTask',taskReqPublisher,(req,res)=>{
    // const resp = taskReqPublisher(req.body);
    // console.log(resp,'get Task Route');
    console.log(res.task,'task route');
    res.status(201).send({Task:req.task});
});

app.get('/modTask',(req,res)=>{
    const resp = taskModPublisher(req.body);
    console.log(resp,'modTask Route');
    res.status(201).send({status:'taskMod OK'});
});

app.listen(8000,()=>console.log("Server up and listening"));