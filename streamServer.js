const express = require('express')
const { ExpressPeerServer } = require('peer')
const app= express()
const server = require('http').Server(app)

const cors = require("cors");
const io = require('socket.io')(server,{
    cors:{
        origin: "http://localhost:8080",
        methods: ["GET","POST"],
    }
})

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

