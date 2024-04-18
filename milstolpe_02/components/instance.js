function renderInstance (parentID, instanceData) {
    const DOM = document.getElementById(parentID);
    const listEl = document.createElement("li");
    DOM.append(listEl);

    let containerName = DOM.parentNode.id;
    listEl.id = createID(containerName, instanceData.id);
    listEl.innerHTML =  `
        <p>${instanceData.name}</p>
        <p>${instanceData.rating}</p>
    `;

    let favBttn = document.createElement("img");
    favBttn.src = instanceData.favorite ? '../media/pixel-star-filled.png' : '../media/pixel-star-outline.png';
    listEl.appendChild(favBttn);

    favBttn.addEventListener("click", (event) => {
        let id = event.target.parentNode.id;
        let entity = event.target.parentNode.parentNode.parentNode.id;

        let idArray = id.match(/\d+/g); 
        let idNum = "";
        idArray.forEach(char => idNum += char);

        let patchRow = {};
        if (!instanceData.fav) {
            patchRow = {
                token: token,
                id: idNum,
                favorite: true
            };
        } else {
            patchRow = {
                token: token,
                id: idNum,
                favorite: false
            };
        }

        const patchRqst = new Request(`api/${entity}.php`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(patchRow)
        });

       State.patch(entity, patchRqst);
    });

    const deleteBttn = document.createElement("img");
    deleteBttn.src = "../media/delete-X.png";
    listEl.appendChild(deleteBttn);

    deleteBttn.addEventListener("click", (event) => {
        let containerID = event.target.parentNode.parentNode.parentNode.id;
        let listID = event.target.parentNode.id;

        let idArray= listID.match(/\d+/g); 
        let idNum = "";
        idArray.forEach(char => idNum += char);
        
        let deleteRow = {
            token: token,
            id: idNum
        };

        const deleteRqst = new Request(`api/${containerID}.php`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(deleteRow)
        });

        State.delete(containerID, deleteRqst);
    });
}

function createID (entity, id) {
    return `${entity}_${id}`;
}

function deleteListing(id) {
    const listEl = document.getElementById(id);
    listEl.remove();
}

function renderListing(parentID, row) {
    renderInstance(parentID, row);
}

function patchListing(id, value) {
    const listEl = document.getElementById(id);
    const favBttn = listEl.querySelector("img");
    
    favBttn.src = value ? '../media/pixel-star-filled.png' : '../media/pixel-star-outline.png';
}

/*
    Feedback: - SE FEEDBACK I container.js FÖRST :)

    RAD 1 __________________________________________________________________________
    
    Om parentID nu istället är en referens till <ul> elementet som skapades i föräldercomponenten och instanceData är en row => { title: -:-, rank: -:-, osv...}
    är allt denna instancekomponenten behöver göra är att skapa <li> elementet och fylla det.
    så rad 2 - 6 behövs ej längre.

    Anledningen varför detta är ett lättare sätt är att du nu inte är låst i att bara kunna rendera alla rows av en entity i denna funktionen
    utan den kan också bara anropas 1 gång med en instanceData / row och funktionen kommer att kunna placera den på sin designerade plats
    något som kommer användas i MS_1.

    ________________________________________________________________________________

    Allt annat ser riktigt bra ut med delete och favourite i <li> elementet :)
    
    minimal detalj men rad 23 gör ingenting då du direkt efteråt renderar om hela appen 

*/