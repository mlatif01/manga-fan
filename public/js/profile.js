// DOM Elements
const profileInputs = document.querySelectorAll(".form-field");
const submitButton = document.getElementById("submit-button");
const profileForm = document.getElementById("profile-form");
const formGroup = document.querySelectorAll('.form-group');
const logoutButton = document.getElementById('logout');
var shouldPost = false;

// Functions
function populateInputs(data) {
    for (let i = 0, len = profileInputs.length; i < len; i++) {
        if (profileInputs[i].type === "number") {
            profileInputs[i].value = data.age;
        } else {
            let key = profileInputs[i].name;
            profileInputs[i].value = data[key];
        }
    }
}

// Authorisation to allow user to access certain resources
// check if local storage has user details (temp session)
async function startupProfile() {
    if (localStorage.getItem('user-token') == null) {
        window.location.replace('index.html');
    } else {
        // Retrieve Profile Data
        var fetch = await getProfileData().then( (data) => {
            // set event handler
            profileForm.addEventListener('submit', editProfile);
            // change button text
            submitButton.value = "Submit Changes";
            // Populate input fields
            populateInputs(data);
        }).catch( () => {
            shouldPost = true;
            profileForm.addEventListener('submit', postProfile);
            console.log("no data");
        });
    }

}


// Event Handlers
if (logoutButton != null) {
    logoutButton.addEventListener('click', onLogout);
}

startupProfile();