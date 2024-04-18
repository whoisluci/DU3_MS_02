function renderInstanceCounter (parentID, instanceData) {
    let instanceAmount = instanceData.length;
    let counterDiv = document.getElementById(parentID);

    let amount = (parentID === "gamesCounter") ? document.getElementById("gamesAmount") : document.getElementById("charAmount");

    console.log(amount);
    if (!amount) {
        amount =  document.createElement("p");
        counterDiv.append(amount);

        if (parentID == "gamesCounter") {
            amount.id = "gamesAmount";
        } else {
            amount.id = "charAmount"
        }
    }

    amount.textContent = instanceAmount;
}

function renderFavCounter (parentID) {
    let favAmount = 0;

    for (let game of _state.games) {
        if (game.favorite === true) {
            favAmount += 1;
        }
    }

    for (let character of _state.characters) {
        if (character.favorite === true) {
            favAmount += 1;
        }
    }

    let counterDiv = document.getElementById(parentID);

    let amount = document.getElementById("favAmount");
    if (!amount) {
        amount = document.createElement("p");
        amount.id = "favAmount";
        counterDiv.append(amount);
    }
    amount.textContent = favAmount;
}

function updateCounter () {
    renderFavCounter("favsCounter");
    renderInstanceCounter("gamesCounter", _state["games"]);
    renderInstanceCounter("charsCounter", _state["characters"]);
}