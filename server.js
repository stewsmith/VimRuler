var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

var player = 1;
io.sockets.on('connection', function(socket) {
  socket.on('update', function(data){
    console.log(data);
  });
});

server.listen(8080);

