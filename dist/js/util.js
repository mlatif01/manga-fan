// Utility Functions

// Gets params given the url query string
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// check if local storage has user token
function checkUserToken() {
    if (localStorage.getItem('user-token') == null) {
        window.location.replace('index.html');
        return true;
    }
    return false;
}

// set up handlers for logout
function setUpLogout() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', ()=> {
            console.log("clear");
            localStorage.clear();
            window.location.replace('index.html');
        });
    }
}