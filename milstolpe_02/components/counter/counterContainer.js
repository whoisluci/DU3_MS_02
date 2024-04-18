function renderCounterContainer (parentID) {
    const DOM = document.createElement("div"); 
    DOM.id = "counter";
    document.getElementById(parentID).append(DOM);

    const gamesCounter = document.createElement("div");
    gamesCounter.id = "gamesCounter";
    DOM.append(gamesCounter);
    gamesCounter.textContent = "games";
    renderInstanceCounter("gamesCounter", _state.games);

    const charsCounter = document.createElement("div");
    charsCounter.id = "charsCounter";
    DOM.append(charsCounter);
    charsCounter.textContent = "characters";
    renderInstanceCounter("charsCounter", _state.characters);

    const favsCounter = document.createElement("div");
    favsCounter.id = "favsCounter";
    DOM.append(favsCounter);
    favsCounter.textContent = "favorites";
    renderFavCounter("favsCounter");
}


