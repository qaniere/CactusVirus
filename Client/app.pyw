import socket
import getpass
import socketio

io = socketio.Client()
username = getpass.getuser() + "@" + socket.gethostname()

@io.on("event-launched")
def event_triggered(data):
    print(data)

io.connect("http://localhost:3000")
io.emit("login", username)

