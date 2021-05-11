import sys
import time
import winsound
import threading
from tkinter import *

global fen
flash_path = sys.argv[1]
event = sys.argv[2]
fen = Tk()

def quitter():
    global fen
    fen.focus_set()
    fen.focus_force()
    fen.attributes("-topmost", True)
    fen.attributes("-topmost", False)
    winsound.PlaySound(flash_path + "Coucou.wav", winsound.SND_FILENAME)    
    fen.destroy()

fen.geometry("1920x1080")
fen.attributes("-fullscreen", True)
photo = PhotoImage(file= flash_path + event + ".png")
can = Canvas(fen, height= 1080, width= 1920)
can.create_image(1920 / 2, 1080 / 2, image= photo)
can.pack()
thread = threading.Thread(target= quitter)
thread.daemon = True
thread.start()
fen.mainloop()
