function renderCreateContainer (parentID) {
    const DOM = document.createElement("div");
    DOM.id = "createAndCount";
    document.getElementById(parentID).append(DOM);

    const inputFields = document.createElement("div");
    inputFields.id = "createInput";
    DOM.append(inputFields);

    const create = document.createElement("input");
    create.setAttribute("type", "text");
    create.id = "textInput";

    const select = document.createElement("select");
    
    inputFields.append(create);
    inputFields.append(select);

    for (let i = 0; i <= 10; i++) {
        const option  = document.createElement("option");
        select.append(option);
        option.textContent = i;
    }

    const buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttonsDiv";
    DOM.append(buttonsDiv);

    const submitMovie = document.createElement("input");
    submitMovie.id = "addGame";

    submitMovie.setAttribute("type", "submit");
    submitMovie.setAttribute("value", "Add Game");

    buttonsDiv.append(submitMovie);

    const submitDirector = document.createElement("input");
    submitDirector.id = "addCharacter";

    submitDirector.setAttribute("type", "submit");
    submitDirector.setAttribute("value", "Add Character");

    buttonsDiv.append(submitDirector);

    submitMovie.addEventListener("click", () => {
        let inputText = document.getElementById("textInput").value;
        let inputRating = Number(document.querySelector("select").value);
        
        let newRow = {
            token: token,
            name: inputText,
            rating: inputRating,
            favorite: false
        }
       
        const postRqst = new Request (`api/games.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRow)
        }
       );

       State.post("games", postRqst);
    });

    submitDirector.addEventListener("click", () => {
        let inputText = document.getElementById("textInput").value;
        let inputRating = Number(document.querySelector("select").value);
        
        let newRow = {
            token: token,
            name: inputText,
            rating: inputRating,
            favorite: false
        };

        const postRqst = new Request (`api/characters.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newRow)
        }
       );

       State.post("characters", postRqst);
    });
}