if (localStorage.getItem("token") != null) {
    renderApp();
} else {
    renderLogIn("wrapper");
}