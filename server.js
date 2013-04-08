var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , diff_match_patch = require('googlediff');

var dmp = new diff_match_patch();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendfile('/index.html');
});

io.sockets.on('connection', function(socket) {
  var target;

  socket.on('getTarget', function(data) {
    target = data;
  });

  socket.on('broadcast1', function(data) {
    if(data !== null) {
      var diffs = dmp.diff_main(data,target);
      console.log(diffs);
      console.log(diffs.length);
      // win condition
      if (diffs.length === 1 && diffs[0][0] === 0) {
        socket.emit('endgame', 'player1');
      }
    }
    socket.broadcast.emit('update1',data);
  });

  socket.on('broadcast2', function(data) {
    if(data !== null) {
      var diffs = dmp.diff_main(data,target);
      console.log(diffs);
      console.log(diffs.length);
      // win condition
      if (diffs.length === 1 && diffs[0][0] === 0) {
        socket.emit('endgame', 'player2');
      }
    }
    socket.broadcast.emit('update2',data);
  });
});

server.listen(8080);

