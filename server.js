var express = require('express')
  , port = process.env.PORT || 3000
  , app = express()
  , pug = require('pug')
  , http = require('http')
  , server = http.createServer(app)
  , { Server } = require("socket.io")
  , io = new Server(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));

server.listen(port);

// load route at root
app.get('/', function(req, res){
  res.render('home');
});

app.get('/ref', function(req, res) {
	res.render('ref');
});

io.sockets.on('connection', function (socket) {

  socket.on('update-home-team-score', function (data) {
    io.sockets.emit('change-home-team-score', data);
  });
  socket.on('update-away-team-score', function (data) {
    io.sockets.emit('change-away-team-score', data);
  });

  socket.on('update-home-team-timeouts', function (data) {
    io.sockets.emit('change-home-team-timeouts', data);
  });
  socket.on('update-away-team-timeouts', function (data) {
    io.sockets.emit('change-away-team-timeouts', data);
  });

  socket.on('update-quarter', function (data) {
    io.sockets.emit('change-quarter', data);
  });
  socket.on('update-down', function (data) {
    io.sockets.emit('change-down', data);
  });
  socket.on('reset-playclock', function (data) {
    io.sockets.emit('playclock-reset', data);
  });
  socket.on('update-gameclock', function (data) {
    io.sockets.emit('gameclock-update', data);
  });


});