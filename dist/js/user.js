// DOM Elements
const formGroup = document.querySelectorAll('.form-group');
const logoutButton = document.getElementById('logout');
const loginForm = document.getElementById('login-form');

const baseURL = 'http://localhost:3000/api/';

// Functions
async function getUserData() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        }
    }

    // Send get request to server
    const response = await fetch(baseURL+'user', options);
    const data = await response.json();
    
    return data;
}

async function onLogin(e) {
    // prevent page from navigating to another page on submit
    e.preventDefault();

    const email = formGroup[0].firstElementChild.value;
    const password = formGroup[1].firstElementChild.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Serialize json data
        body: JSON.stringify({
            email: email,
            password: password
        })
    }
    
    // Send post request to server
    const response = await fetch(baseURL+'user/login', options);
    const data = await response.json();
    
    if (data.token != null) {
        localStorage.setItem('user-token', data.token);
        window.location.replace('dashboard.html');
    }
}

function onLogout() {
    console.log("clear");
    localStorage.clear();
}

// Event Listeners
if (loginForm) {
    loginForm.addEventListener('submit', onLogin);
}


