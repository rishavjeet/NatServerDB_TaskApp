const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://RishavDutta:Soma123@cluster0.o15c3.mongodb.net/NatServer?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('Connected to DB'))
.catch(()=>console.log('Error Occured: Cannot connect to DB'));