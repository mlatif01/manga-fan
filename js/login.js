// DOM Elements
const formGroup = document.querySelectorAll('.form-group');
const loginForm = document.getElementById('login-form');

var baseURL = 'http://localhost:3000/api/';

// Functions
function checkInputs(e) {
    // get the values from the inputs
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    let validEmail = false;
    let validPassword = false;

    if (emailVal === "") {
        setErrorFor(email, "Email is required");
        validEmail = false;
    } else {
        setSuccessFor(email);
        validEmail = true;
    }

    if (passwordVal === "") {
        setErrorFor(password, "Password is required");
        validPassword = false;
    } else {
        setSuccessFor(password);
        validPassword = true;
    }

    // if all field inputs are valid - submit POST request to server
    if (validPassword && validEmail) {
        login(e);
    }
}

function setErrorFor(input, message) {
    let formGroup = input.parentElement; // form-group
    const small = formGroup.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formGroup.className = "form-group error";
}

function setSuccessFor(input) {
    let formGroup = input.parentElement; // form-group
    // add success class
    formGroup.className = "form-group success";
}

// Event Listeners
if (loginForm != null) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs(e);
    });
}





