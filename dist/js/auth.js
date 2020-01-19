// Authorisation to allow user to access certain resources
// check if local storage has user details (temp session)
if (localStorage.getItem('user') === null) {
    window.location.replace('index.html');
}

// DOM Elements
// grab all user-item links
const links = document.querySelectorAll('.user-item');

// Functions

// check if user is logged in
function authUserAfterLogin(e) {
    const user = localStorage.getItem('user');
    // if user is logged in - allow navigation to user links
    if (user != null) {
        console.log("YES");
        window.location.replace(`${e.target.id}.html`);
    } else {
        window.location.replace('index.html');
    }
}

// Event Listeners
links.forEach(item => item.addEventListener('click', authUserAfterLogin));