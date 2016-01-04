var express = require('express');
var app = express();
var http = require('http').Server(app);
var users = {};
var clients = [];
var rooms = {};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res){
  res.render('index');
});

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
  ///console.log(socket.id);
  socket.on('sign', function(data){
    users[socket.id] = {username : data.name, room: data.room};
    clients.push(socket.id);
    if(!rooms[data.room]) {
      rooms[data.room] = [];
    }
    rooms[data.room].push(socket.id);
    console.log(clients); 
    console.log('joined ' + data.room);
    socket.join(data.room);
    io.to(data.room).emit('new user', {username : users[socket.id].username, 
      count : clients.length});
    var d = new Date();
    io.to(data.room).emit('chat message', {author : 'Server', 
      text: 'User ' + data.name + ' joined the chat. Please welcome her/him warmly!',
      date: d.getTime()});
  });
  
socket.on('disconnect', function(){
  console.log('user disconnected');
  if(clients.indexOf(socket.id) != -1) {
    clients.splice(clients.indexOf(socket.id), 1);
    io.to(users[socket.id].room).emit('user left', {username: users[socket.id].username,
      count : clients.length});
    var d = new Date();
    io.to(users[socket.id].room).emit('chat message', {author : 'Server', 
      text: 'User ' + users[socket.id].name + ' left the chat.',
      date: d.getTime()});
  }
});

  socket.on('chat message', function(data){
    console.log(data.date +  ' ' + data.author + ': ' + data.text)
    io.to(users[socket.id].room).emit('chat message', data);
  });

});

