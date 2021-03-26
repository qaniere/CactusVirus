var users = []
var selectedComputer = null;

var noComputerSpan = document.getElementById("no-computer");
var computerZone = document.getElementById("computer-zone");
var selectedComputerSpan = document.getElementById("computer-selected");
var form = document.getElementById("form");

var isActiveCase = document.getElementById("isActive");
var delayInput = document.getElementById("delay")
var playingTimeInput = document.getElementById("playing-time");

function get(url) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false );
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getUsers() {
    let rawUsersList = get("http://localhost:3000/API/fetch/getUsers");
    let userList = rawUsersList.split("\n")

    userList.forEach(user => {
        // console.log(user);
        if(!users.includes(user) && user != "") {
            users.push(user)
            let newButton = document.createElement("BUTTON");
            newButton.innerHTML = user;
            newButton.id = user;
            newButton.className = user;
            computerZone.appendChild(newButton);
        }
    });

    users.forEach(user => {
        if(!rawUsersList.includes(user)) {
            for( var i = 0; i < users.length; i++){ 
                if (users[i] === user) { 
                    users.splice(i, 1); 
                }
            }
            document.getElementById(user).outerHTML="";

            if(selectedComputer == user) {
                form.style.visibility = "hidden";
                selectedComputerSpan.innerHTML = "Aucun"
                selectedComputer = null
            }

            if(users.length == 0) {
                noComputerSpan.innerHTML = "Aucun ordinateur n'est connecté pour le moment";
            }
        }
    });

    bindButtons();
    if(users.length > 0) {
        noComputerSpan.innerHTML = "";
    }
    setTimeout(getUsers, 1000);
}

function bindButtons() {
    var buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
    
       button.addEventListener("click", event => {
            form.style.visibility = "visible";
            selectedComputer = event.srcElement.innerHTML;
            selectedComputerSpan.innerHTML = selectedComputer;

            options = JSON.parse(get("http://localhost:3000/API/fetch/getUserOptions/" + selectedComputer +"/false"));

            if (options.isStartingEarrapeActive == "true") {
                isActiveCase.checked = true;
            } else {
                isActiveCase.checked = false;
            }

            delayInput.value = options["delayBeforePlaying"];
            playingTimeInput.value = options["playingtime"];

       });
    
    });
}

isActiveCase.addEventListener("change", () => {
    get("http://localhost:3000/API/update/isStartingEarrapeActive/" + selectedComputer + "/" + isActiveCase.checked);
});

delayInput.addEventListener("change", () => {
    get("http://localhost:3000/API/update/delayBeforePlaying/" + selectedComputer + "/" + delayInput.value);
});

playingTimeInput.addEventListener("change", () => {
    get("http://localhost:3000/API/update/playingtime/" + selectedComputer + "/" + playingTimeInput.value);
});

getUsers()
