var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res){
  res.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
