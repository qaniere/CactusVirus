var socket = io();
var buttons = document.querySelectorAll("button")

buttons.forEach(button => {  
    button.addEventListener("click", (event) => {
        socket.emit("event-triggered", event.path[0].id)
    });
});
