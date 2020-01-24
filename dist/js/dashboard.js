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
const openModalElems = document.querySelectorAll("[data-open]");
const modalIsVisible = "is-visible";
const closeModalElems = document.querySelectorAll("[data-close]");

// Functions
function addManga(e) {
    console.log(e);
}


// Event Handlers
if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
}

// Modal Events
// Open Modal
for(const elem of openModalElems) {
    elem.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(modalIsVisible);
    });
}

// Close Modal Button
for (const elem of closeModalElems) {
    elem.addEventListener("click", function() {
      this.parentElement.parentElement.parentElement.classList.remove(modalIsVisible);
    });
}

// Clicking Outside Modal
document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(modalIsVisible);
    }
});

// Pressing Esc To Close Modal
const isVisible = "is-visible";
 
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(modalIsVisible);
  }
});


