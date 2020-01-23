// DOM Elements
const formGroup = document.querySelectorAll('.form-group');
const loginForm = document.getElementById('login-form');

var baseURL = 'http://localhost:3000/api/';

// Functions

// Event Listeners
if (loginForm != null) {
    loginForm.addEventListener('submit', login);
}





