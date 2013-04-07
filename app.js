var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(app);

server.listen(8080);

app.use("/", express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
  socket.on('msg',function (data) {
    io.sockets.emit('new',data);
  });
});

