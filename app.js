var express = require('express');
var app = express();
var http = require('http').Server(app);



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

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(data){
    console.log(data.date +  ' ' + data.author + ': ' + data.text)
    io.emit('chat message', data);
  });

});

