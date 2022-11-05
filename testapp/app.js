const express = require('express'); //importing express module
const app = express(); //Initializing app
//Routing
//.get() -> Http GET request
//req -> request from client side
//res -> response to be sent back to Client
app.get('/',(req,res)=>{
    res.send('Home Page');
});
app.get('/Login',(req,res)=>{
    res.send('Login Page');
});
//end
app.listen(9000,()=>console.log('Server running at port 9000'));