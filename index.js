const app = require('express')();
const WebSocket = require("ws");
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
var lastsession;

// Listen
server.listen(3000, function () {
 console.log('Ready at port 3000');
})

// Express static
app.use(require('express').static('public'));

wss.broadcast = function (data, socket) {
     wss.clients.forEach(function (client) {
       if (client === socket) return;
           client.send(data)
     });
}

wss.on('connection', function (socket) {
  // If there's a Last session, Send it to Client.
  if (lastsession && lastsession.length > 0) socket.send(lastsession);
  // If someone is Typing, Broadcast it
  socket.on('message', data => {
   wss.broadcast(data, socket)
   lastsession = data;
  })
})
