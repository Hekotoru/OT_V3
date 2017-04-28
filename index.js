var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PubSub = require('pubsub-js');


var mySubscriber = function( msg, data ){
    io.emit('chat message', data);
};

var token = PubSub.subscribe('doc', mySubscriber );


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    PubSub.publish('doc', msg); 
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    