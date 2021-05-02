var socket = io();
var selectedUser = null;
var buttons = document.querySelectorAll("button")

buttons.forEach(button => {  
     
    if(button.id != "send-tts") {
        button.addEventListener("click", (event) => {
            socket.emit("event-triggered", {"event": event.path[0].id, "user": selectedUser});
        });
    }
});

document.getElementById("send-tts").addEventListener("click", (event) => {
    var sentence = document.getElementById("tts-sentence").value;
    if (sentence != "") {
        socket.emit("event-triggered", "tts\n" + sentence);
    }
});

window.addEventListener("DOMContentLoaded", (event) => {
    socket.emit("ask-users", "c kiki k la ??")
});

socket.on("send-users", (usernames) => {
    
    if(usernames[0] != undefined) {
        document.getElementById("no-computer").innerHTML = "";
    };

    usernames.forEach(user => {
            let newButton = document.createElement("button");
            newButton.innerHTML = user;
            newButton.id = user;
            newButton.addEventListener("click", (event) => {
                selectedUser = event.path[0].id
                document.getElementById("controls").style.visibility = "visible";
            });
            document.getElementById("computer-zone").appendChild(newButton);
    });
});

socket.on("new-user", (username) => {

    let newButton = document.createElement("button");
    newButton.innerHTML = username;
    newButton.id = username;
    document.getElementById("no-computer").innerHTML = "";
    newButton.addEventListener("click", (event) => {
        selectedUser = event.path[0].id
        document.getElementById("controls").style.visibility = "visible";
        document.getElementById("selected-computer").innerHTML = selectedUser;
    });
    document.getElementById("computer-zone").appendChild(newButton);
});

socket.on("disconnected-user", (username) => {

    if(selectedUser == username) {
        selectedUser = "";
        document.getElementById("controls").style.visibility = "hidden";
        document.getElementById("no-computer").innerHTML = "Aucun ordinateur n'est connecté pour le moment";
        document.getElementById("selected-computer").innerHTML = "Aucun";
    }
    document.getElementById(username).outerHTML = "";
});
