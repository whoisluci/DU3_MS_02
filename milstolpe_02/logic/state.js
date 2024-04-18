let token = localStorage.getItem("token");
let _state = {};

let State = {
    get(entity) {
        const data = _state[entity];
        const dataClone = JSON.parse(JSON.stringify(data));
        return dataClone;
    },

    async post(entity, rqst) {
        let data = await fetcher(rqst);
        _state[entity].push(data);
    
        postInstance(`${entity}_list`, data);
        updateCounter();
    },

    async patch(entity, rqst) {
        let data = await fetcher(rqst);

        for (let row of _state[entity]) {
            if (data.id == row.id) {
                row.favorite = data.favorite;
            }
        }


        patchListing(`${entity}_${data.id}`, data.favorite);
        updateCounter();
    },

    async delete(entity, rqst) {
        let data = await fetcher(rqst);
        const array = _state[entity];
    
        let objectToSplice = array.find(element => element.id == data.id);
        let indexOfObject = array.indexOf(objectToSplice);

        array.splice(indexOfObject, 1);

        deleteInstance(`${entity}_${data.id}`);
        updateCounter();
    }
}


async function renderApp() {
    document.querySelector("main").innerHTML = null;

    const rqstGames = new Request(`./api/games.php?token=${token}`);
    const resrcGames = await fetcher(rqstGames);
    _state.games = resrcGames;

    const rqstChars = new Request(`api/characters.php?token=${token}`);
    const resrcChars = await fetcher(rqstChars);
    _state.characters = resrcChars;

    renderCreateContainer("wrapper");
    renderCounterContainer("createAndCount");

    renderContainer("wrapper", "games");
    renderContainer("wrapper", "characters");
    renderLogOut("wrapper");
}

function renderLogIn () {
    renderLogInContainer("wrapper");
}
