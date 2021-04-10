import socket
import getpass
import winsound
import socketio

io = socketio.Client()
username = getpass.getuser() + "@" + socket.gethostname()

soundbox_path = r"C:\Users\quent\Desktop\Perso\Cactus Virus\Client\assets\Soundbox\\"
soundlist = ["nopal-earrape", "passe-partout", "rene-ballek", "tabarnak", "wii-sport", "pauvre-conne", "patrick-ftg", "losing-horn", "titanic"]

@io.on("event-launched")
def event_triggered(event):
    
    print(event)

    if event in soundlist:
        winsound.PlaySound(soundbox_path + event + ".wav", winsound.SND_ASYNC)
    
    elif event == "stop":
        winsound.PlaySound(None, winsound.SND_PURGE)

io.connect("http://localhost:3000")
io.emit("login", username)
