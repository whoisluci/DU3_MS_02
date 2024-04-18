function renderLogInContainer (parentID) {
    //kod
    const DOM = document.createElement("div");
    DOM.id = "logIn";
    document.getElementById(parentID).append(DOM);

    DOM.innerHTML = `
    <input type="submit" id="renderLogInBttn" value="LOG IN"></input>
    <input type="submit" id="renderRegBttn" value="REGISTER"></submit>
    `;

    const renderLogInBttn = document.getElementById("renderLogInBttn");
    renderLogInBttn.addEventListener("click", () => {
        //här ska ske login! genom att skicka en request till APIn med 
        //user info 

        DOM.innerHTML = `
        <h1>Log in to access the website</h1>
        <input type="text" id="username" name="username" placeholder ="username"></input>
        <input type="password" id="password" name="password" placeholder ="password"></input>
        <input type="submit" id="logInBttn" value="LOG IN"></input>
        `;
        
        let logInBttn = document.getElementById("logInBttn");
        logInBttn.addEventListener ("click", async () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
    
            let userInfo = {
                name: username,
                password: password,
            };
    
            let logInRqst = new Request(`api/login.php`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userInfo)
            });
    
            let logInFetch = await fetcher(logInRqst);
            let logInToken = await logInFetch.token;
    
            if (logInToken != null || logInToken != undefined) {
                localStorage.setItem("token", logInToken);
                renderApp();
            } else {
                window.alert("Log in went wrong!");
            }
        })
    });

    const renderRegBttn = document.getElementById("renderRegBttn");    
    renderRegBttn.addEventListener("click", async (e) => {
        DOM.innerHTML = null;
        DOM.innerHTML = `
        <h1>Register an account</h1>
        <input type="text" id="regUsername" name="username" placeholder ="username"></input>
        <input type="password" id="regPassword" name="password" placeholder ="password"></input>
        <input type="password" id="passwordConf" name="passwordConf" placeholder="confirm password"></input>
        <input type="submit" id="createAccBttn" value="REGISTER"></submit>
        `;

        let createBttn = document.getElementById("createAccBttn");

        createBttn.addEventListener ("click", async () => {
            let password = document.getElementById("regPassword").value;
            let passwordConf = document.getElementById("passwordConf").value;
            let regUsername = document.getElementById("regUsername").value;
        
            if (password === passwordConf && regUsername != null) {

                let regUsername = document.getElementById("regUsername").value;
        
                let regInfo = {
                    name: regUsername,
                    password: password,
                };
        
                let regRqst = new Request(`api/users.php`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(regInfo)
                });

                let regFetch = await fetcher(regRqst);
                if (regFetch != undefined) {
                    window.alert("Register completed! You can now log in.");
                } else {
                    window.alert("Something went wrong on your end, try again.");
                }
            } else {
                window.alert("Password or username are wrong, try again.");
            }
        });
    });
}