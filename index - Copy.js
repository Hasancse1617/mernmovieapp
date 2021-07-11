const express = require('express');
const connect = require('./config/db');
require('dotenv').config();
const userRoute = require('./routes/admin/UserRoute');
const frontuser = require('./routes/front/UserRoute');
const bodyParser = require('body-parser');


const app = express();//Connect express
connect();//Connect Database
//cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

app.use(express.static('public'));//Static Folder Connection
app.use(bodyParser.json());
app.use('/', userRoute);
app.use('/user', frontuser);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log('Your app is running on port 5000');
});
const jwt = require('jsonwebtoken');
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3005",
      methods: ["GET", "POST"]
    }
  });
io.use(async(socket,next)=>{
   const token = socket.handshake.query.token;
   
    try {
        const payload = await jwt.verify(token, process.env.SECRET);
    
        socket.userId = payload.user._id;
        next();
    } catch (error) {
    }
});
let users = [];
io.on('connection', (socket) =>{
    console.log("Connected: " + socket.userId)
    users[socket.userId] = socket.id;
    console.log('Hasan',socket.id);
    socket.on('disconnect', ()=>{
        console.log("Disconnect: " + socket.userId)
    })
    socket.on('createroom', payload=>{
        socket.join(payload.id);
    })
    socket.on('message', payload=>{
        console.log('Server received message', payload);
        let receiver_id = users[payload.receiver_id];
        io.to(receiver_id).emit('newmessage',payload);
    })
})