// DOM Elements
const profileInputs = document.querySelectorAll(".form-field");
const submitButton = document.getElementById("submit-button");
const profileForm = document.getElementById("profile-form");
const formGroup = document.querySelectorAll('.form-group');
const logoutButton = document.getElementById('logout');
let editChanges = false;
let userProfileData = undefined;

// Functions
function populateInputs() {
    for (let i = 0, len = profileInputs.length; i < len; i++) {
        if (profileInputs[i].type === "number") {
            profileInputs[i].value = userProfileData.age;
        } else {
            let key = profileInputs[i].name;
            profileInputs[i].value = userProfileData[key];
        }
    }
}

// Authorisation to allow user to access certain resources
// check if local storage has user details (temp session)
function startupProfile() {
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

            // set up event handlers 
            if (!editChanges) {
                profileForm.addEventListener('submit', postProfile);
            } else {
                profileForm.addEventListener('submit', editProfile);
            }
         })
    }
}

// Event Handlers
if (logoutButton != null) {
    logoutButton.addEventListener('click', onLogout);
}

startupProfile();