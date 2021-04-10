const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);


function getCurrentTime() {

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
    
}


app.get("/", (req, res) => {
    fs.readFile("src/index.html", "utf8" , (err, content) => {
        if (err) {
            res.send("Error 500");    
        } else {
            console.log("[" + getCurrentTime() + "] Console was accessed");
            res.send(content);
        }
    });
});

app.use("/file", express.static("src"));

io.on("connection", (client) => {

    client.on("login", (username) => {
        console.log("[" + getCurrentTime() + '] "' + username + '" is listening');
    });

    client.on("event-triggered", (event) => {
        io.emit("event-launched", event)
        console.log("[" + getCurrentTime() + '] Event "' + event + '" was triggered');
    });

});

server.listen(3000, () => {
    console.log("[" + getCurrentTime() + '] Server started on port 3000');
});
