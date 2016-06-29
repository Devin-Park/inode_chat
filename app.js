var express = require('express');
var app = express();
app.set('port' , process.env.PORT || 3003);

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
// var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
// var appEnv = cfenv.getAppEnv();

// http 와 socket.io 를 사용
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('Client connected');
  socket.on('P', function(msg) {
    console.log('P: ' + msg);
    io.emit('P', msg);
  });
});

app.listen(app.get('port'), function(){
	console.log( 'Express started in localhost:' + app.get('port') + ';pressCtrl-C to terminate.');
});

// start server on the specified port and binding host
//http.listen(appEnv.port, '0.0.0.0', function() {

  // print a message when the server starts listening
  //console.log("server starting on " + appEnv.url);
//});