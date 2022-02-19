const express =require("express");
const bodyParser=require('body-parser');
const mongoose = require('mongoose');


//setup express app
const app = express();

//connect mongoose
mongoose.connect('mongodb://localhost/ninjaApp');
mongoose.Promise=global.Promise;

app.use(express.static('public'));

//first middleware
app.use(bodyParser.json());

//initial routes 
app.use('/api',require('./routes/api'));

//second middleware-error handle
app.use(function(err,req,res,next){
    res.status(422).send({
        error:err.message
    });
});

//listen for requests
app.listen(process.env.port|| 4000,function(){
 console.log('now listening to the request');
});