const express = require('express')

const app= express()
const server = require('http').Server(app)

const cors = require("cors");
app.use(cors());


const io = require('socket.io')(server,{
    cors:{
        origin: "*",
        methods: ["GET","POST"],
    }
})
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server,{
    debug: true
})


io.on('connection', socket => {
  
    socket.on('join-room', (roomId, userId) => {
      console.log("user "+userId+ " joined room "+roomId)
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user-connected', userId);
   
    })
  })
  


server.listen(3031,()=>{
  console.log('Stream sever running at port 3031')
})

