var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
  	socket.on('disconnect', function(){
  	console.log('user disconnected');
  });
  socket.on('chat message', function(data){
  	console.log(data.date +  ' ' + data.author + ': ' + data.text)
  	io.emit('chat message', data);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
