function renderContainer(parentID, entity) {
    const DOM = document.createElement("div");
    DOM.id = entity;
    document.getElementById(parentID).append(DOM);

    DOM.innerHTML = `
    <h1>${DOM.id}</h1>
    <div id="listInfo">
        <h2>Name</h2>
        <h2>Rating</h2>
        <h2>Fav</h2>
        <h2>Delete</h2>
    </div>
    <ul id="${entity}_list"></ul>
    `;

    const entityArray = State.get(entity);
    entityArray.forEach( row => renderListing(`${entity}_list`, row) );
}

function postInstance (parentID, row) {
    renderListing(parentID, row);
}

function deleteInstance (instanceData) {
    deleteListing(instanceData);
}