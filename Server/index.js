const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

var loggedUsers = [];
var username = {};

function getCurrentTime() {

    function addZero(i) {
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }
      
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ':' + m + ':' + s;
    
}

app.get('/', (req, res) => {
    res.send('Hello world !')
});

io.on('connection', (socket) => {

    socket.on('login', (event) => {
        console.log('[' + getCurrentTime() + '] "' + event.name + '" has logged in');
        loggedUsers.push(event.name);
        username[event.name] = socket;
    });

});

server.listen(3000, () => {
    console.log('[' + getCurrentTime() + '] Server started on port 3000');
});
