const express = require('express');
const connect = require('./config/db');
require('dotenv').config();
///Admin Route
const userRoute = require('./routes/admin/UserRoute');
const categoryRoute = require('./routes/admin/CategoryRoute');
const genreRoute = require('./routes/admin/GenreRoute');
const videoRoute = require('./routes/admin/VideoRoute');
const interviewRoute = require('./routes/admin/InterviewRoute');
///Front Route
const profileRoute = require('./routes/front/ProfileRoute');
const frontuser = require('./routes/front/UserRoute');
const movieRoute = require('./routes/front/MovieRoute');
const singleRoute = require('./routes/front/SingleRoute');
const interRoute = require('./routes/front/InterviewRoute');
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
app.use('/', categoryRoute);
app.use('/', genreRoute);
app.use('/', videoRoute);
app.use('/', interviewRoute);
app.use('/user', frontuser);
app.use('/user', profileRoute);
app.use('/user', movieRoute);
app.use('/user', singleRoute);
app.use('/user', interRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log('Your app is running on port 5000');
});

///Socket Io
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

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) =>{
    // console.log("Connected: " + socket.userId)
    // users[socket.userId] = socket.id;
    // console.log('Hasan',socket.id);
    socket.on('disconnect', ()=>{
        // console.log("Disconnect: " + socket.id)
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
    socket.on("addUser", (userId)=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })
    // socket.on('createroom', payload=>{
    //     socket.join(payload.id);
    // })
    socket.on('message', payload=>{
        console.log('Server received message', payload);
        let user = getUser(payload.receiver_id);

        if(user !== undefined){
            io.to(user.socketId).emit('newmessage',payload);
        }
    });

    ///Video Call
    socket.on("callUser", (data) => {
      // console.log(data)
      let user = getUser(data.userToCall);
      if(user !== undefined){
          io.to(user.socketId).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
      }
    })
    socket.on("answerCall", (data) => {
      let user = getUser(data.to);
      console.log('Sender Socket',user.socketId)
      if(user !== undefined){
         io.to(user.socketId).emit("callAccepted", data.signal)
      }
    })
})