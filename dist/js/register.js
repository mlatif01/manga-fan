// DOM Elements
const formGroup = document.querySelectorAll('.form-group');
const registerForm = document.getElementById('register-form');

var baseURL = 'http://localhost:3000/api/';

// Functions

// Event Listeners
if (registerForm != null) {
    registerForm.addEventListener('submit', register);
}




