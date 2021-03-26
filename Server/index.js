const fs = require("fs");
const express = require("express");
const { cpuUsage } = require("process");

var defaultOptions = {
    "isStartingEarrapeActive": false,
    "delayBeforePlaying": 2,
    "playingtime": 5
}
var users = [];
var olderUsers = [];
var usersLastConnexion = {};
var usersOptions = {};

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
    return h + "-" + m +"-" + s;
    
}

function calculateOffTime(time) {
    time = time.split("-");
    result = time.map(function (x) { 
        return parseInt(x, 10); 
      });
    result2 = []
    result2[0] = result[0] * 60;
    result2[0] = result2[0] * 60;
    result2[1] = result[1] * 60;
    result2[2] = result[2];
    
    total = result2[0] + result2[1] + result2[2];

    time2 = getCurrentTime().split("-");
    result = time2.map(function (x) { 
        return parseInt(x, 10); 
      });
    result2 = [];
    result2[0] = result[0] * 60 ;
    result2[0] = result2[0] * 60;
    result2[1] = result[1] * 60;
    result2[2] = result[2];

    total2 = result2[0] + result2[1] + result2[2];
    return total2 - total;
}

app = express();
app.use("/file", express.static("src"));

app.get("/", (req, res) => {
    fs.readFile("src/index.html", "utf8" , (err, content) => {
        if (err) {
            res.send("Error 500");    
        } else {
            console.log("[" + getCurrentTime() + "] INFO - Console was accessed");
            res.send(content);
        }
    });
});

app.get("/API/login/:username", (req, res) => {
    
    if(!olderUsers.includes(req.params.username)) {

        let newUser = req.params.username;
        console.log("[" + getCurrentTime() + "] INFO - New user has logged : " + newUser);

        users.push(newUser);
        olderUsers.push(newUser);
        usersLastConnexion[newUser] = getCurrentTime();
        usersOptions[newUser] = {
            "isStartingEarrapeActive": false,
            "delayBeforePlaying": 2,
            "playingtime": 5
        };

    } else {
        let loggedUser = req.params.username;
        console.log("[" + getCurrentTime() + "] INFO - User has logged : " + loggedUser);
        usersLastConnexion[loggedUser] = getCurrentTime();
        users.push(loggedUser);
    }

    res.send(usersOptions[req.params.username]);
});

app.get("/API/fetch/getUsers", (req, res) => {

    let sendString = "";
    users.forEach(user => {
        if(calculateOffTime(usersLastConnexion[user]) > 5) {
            console.log("[" + getCurrentTime() + "] INFO - User '" + user +"' is disconnected");
            for( var i = 0; i < users.length; i++){ 
                if (users[i] === user) { 
                    users.splice(i, 1); 
                }
            
            }
        }
        sendString += user + "\n";
    });

    res.send(sendString)
})

app.get("/API/fetch/getUserOptions/:user/:isUser", (req, res) => {

    res.send(usersOptions[req.params.user]);
    if(req.params.isUser == "true") {
        usersLastConnexion[req.params.user] = getCurrentTime();
        if(!users.includes(req.params.user)) {
            users.push(req.params.user);
        }
    }
});

app.get("/API/update/:param/:user/:newValue", (req, res) => {

    console.log("[" + getCurrentTime() + "] INFO - Changed the param '" + req.params.param + "' at the value '" + req.params.newValue + "' for user '" + req   .params.user + "'");

    usersOptions[req.params.user][req.params.param] = req.params.newValue;
    res.send("200");
});

app.listen(3000);
