// DOM Elements
const profileInputs = document.querySelectorAll(".form-field");
const submitButton = document.getElementById("submit-button");
const profileForm = document.getElementById("profile-form");
const formGroup = document.querySelectorAll('.form-group');
const logoutButton = document.getElementById('logout');
let editChanges = false;

// Authorisation to allow user to access certain resources
// check if local storage has user details (temp session)
let userProfileData = undefined;

if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
} else {
        // Retrieve Profile Data
        getProfileData().then( data => {
        userProfileData = data;
        // Populate input fields
        populateInputs();

        // Change submit to edit if profile exists
        if (userProfileData != null) {
            submitButton.value = "Submit Changes";
            editChanges = true;
        }
     })
}

// Functions
function populateInputs() {
    for (let i = 0, len = profileInputs.length; i < len; i++) {
        if (profileInputs[i].type === "number") {
            profileInputs[i].value = userProfileData.age;
        } else {
            let key = profileInputs[i].name;
            console.log(typeof(key));
            profileInputs[i].value = userProfileData[key];
        }
    }
}

// Event Handlers
if (!editChanges) {
    profileForm.addEventListener('submit', postProfile);
}

if (logoutButton != null) {
    logoutButton.addEventListener('click', onLogout);
}