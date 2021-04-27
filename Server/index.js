const fs = require("fs");
const ejs = require('ejs');
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

var usernames = {}

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

function log(message) {
    
    if(message.includes("tts\n")){
        message = message.split("\n")
        message = message[0] + '" was triggered. (Sentence => "' + message[1].replace(" was triggered", "") + ')';
    };

    console.log(message);
    var stream = fs.createWriteStream("logs.log", {"flags": "a"});
    stream.once("open", function(fd) {
        stream.write(message + "\r\n");
    });
}

app.use("/file", express.static("src"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    fs.readFile("src/index.html", "utf8" , (err, content) => {
        if (err) {
            res.send("Error 500");    
        } else {
            log("[" + getCurrentTime() + "] Console was accessed")
            res.send(content);
        };
    });
});

app.get("/getLogs", (req, res) => {
    fs.readFile("logs.log", "utf8" , (err, content) => {
        if (err) {
            res.send("No logs found. This means that there is a problem with the server, it must be restarted");    
        } else {
            log("[" + getCurrentTime() + "] Logs were sended");
            content = content.split("\r\n");
            res.render("logs.ejs", {"logs": content});
        };
    });
})


io.on("connection", (client) => {

    client.on("login", (username) => {
        usernames[client] = username;
        log("[" + getCurrentTime() + '] "' + username + '" is connected');
    });

    client.on("disconnect", () => {
        if(usernames[client] != undefined) {
            log("[" + getCurrentTime() + '] "' + usernames[client] + '" is disconnected');
        };
    });

    client.on("event-triggered", (event) => {
        io.emit("event-launched", event)
        log("[" + getCurrentTime() + '] Event "' + event + '" was triggered');
    });

});

server.listen(3000, () => {
    log("[" + getCurrentTime() + '] Server started on port 3000');
});
