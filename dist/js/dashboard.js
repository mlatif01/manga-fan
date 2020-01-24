// Authorisation to allow user to access certain resources
// check if local storage has user details (temp session)
if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
} else {
    // display username
    getUserData().then( data => {
        userProfile = data;
        usernameHeading.innerHTML += userProfile.username;
     })
}

// DOM Elements
const usernameHeading = document.getElementById('username-heading');
const logoutButton = document.getElementById('logout');
const addMangaButton = document.getElementById('add-manga');

// Functions
function addManga(e) {
    console.log(e);
}

// Event Handlers
if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
}

addMangaButton.addEventListener('click', addManga);

