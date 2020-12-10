const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var lastsession;

// Listen
server.listen(3000, function () {
 console.log('Ready at port 3000');
})

// Express static
app.use(require('express').static('public'));

io.on('connection', function (socket) {
  // If there's a Last session, Send it to Client.
  if (lastsession && lastsession.length > 0) socket.emit('global', lastsession);

  // If someone is Typing, Broadcast it
  socket.on('input', data => {
   socket.broadcast.emit('global', data)
   lastsession = data;
  })
})
