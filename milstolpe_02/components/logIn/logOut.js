function renderLogOut (parentID) {
    //skapa log out BTTN
    const DOM = document.getElementById(parentID);
    const logOutBttn = document.createElement("button");
    logOutBttn.id = "logOut";
    logOutBttn.textContent = `LOG OUT`;
    DOM.append(logOutBttn);

    logOutBttn.addEventListener("click", () => {
        localStorage.removeItem("token");
        document.querySelector("main").innerHTML = null;
        renderLogIn();
    });
}