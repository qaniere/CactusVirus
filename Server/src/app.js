var socket = io();
var buttons = document.querySelectorAll("button")

buttons.forEach(button => {  
     
    if(button.id != "send-tts") {
        button.addEventListener("click", (event) => {
            socket.emit("event-triggered", event.path[0].id)
        });
    }
});

document.getElementById("send-tts").addEventListener("click", (event) => {
    var sentence = document.getElementById("tts-sentence").value;
    if (sentence != "") {
        socket.emit("event-triggered", "tts\n" + sentence);
    }
});
