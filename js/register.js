// DOM Elements
const formGroup = document.querySelectorAll('.form-group'); // all form-group elements
const registerForm = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Functions

function checkInputs(e) {
    // get the values from the inputs
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmPasswordVal = confirmPassword.value.trim();
    let validUsername = false;
    let validEmail = false;
    let validPassword = false;
    let validConfirmPassword = false;
    
    if (usernameVal === "") {
        // show error
        // add error class
        setErrorFor(username, "Username is required");
        validUsername = false;
    } else {
        // add success class
        setSuccessFor(username);
        validUsername = true;
    }

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
    }
    else if (passwordVal.length <= 6) {
        setErrorFor(password, "Minimum length of password is 6 characters");
        validPassword = false;
    } else {
        setSuccessFor(password);
        validPassword = true;
    }

    if (confirmPasswordVal !== passwordVal) {
        setErrorFor(confirmPassword, "Password does not match");
        validConfirmPassword = false;
    }
    else if (passwordVal !== "") {
        setSuccessFor(confirmPassword);
        validConfirmPassword = true;
    }

    // if all field inputs are valid - submit POST request to server
    if (validUsername && validPassword && validEmail && validConfirmPassword) {
        register(e);
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
    const small = formGroup.querySelector('small');

    // add success class
    formGroup.className = "form-group success";
}

// Event Listeners
if (registerForm != null) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs(e);
    });
}




