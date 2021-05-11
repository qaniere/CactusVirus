## Cactus Virus

Cactus virus is a malware for fun only. It allows to display memes on a remote computer on which it is installed

## How it works ?

The project is divided in two parts :

* **Client** : Made with Python
* **Server** : Made with ExpressJs

The client file must be placed on startup folder (see installation section). It will connect to the server with Socket.Io. Once launched, the server will server a web interface. Clicking on a button on the web interface will emit a socket.io event that will be forwarded to the client via the server.

## Installation 

For the server, clone the repo and install dependancies.

For the client : Work in progress to redact this doc..
