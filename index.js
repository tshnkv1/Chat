const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', (socket) => {
    console.log('Successful connection');
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Successful disconnection');
    });

    socket.on('send message', (data) => {
       io.sockets.emit('add message', {
           name: data.name,
           message: data.message,
           className: data.className,
       });
    });
});