const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

app.get('/', function(req, res) {
   res.sendFile('index.html', { root: __dirname });
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});