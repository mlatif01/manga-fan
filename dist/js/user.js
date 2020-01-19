const userCreds = [
    {
        email: 'milad@me.com', 
        password: 'password'
    },
    {
        email: 'amu@me.com', 
        password: 'password'
    }
];

const formGroup = document.querySelectorAll('.form-group');
const loginButton = document.getElementById('submit');
const mangaFan = document.getElementById

function validateUser() {
    const email = formGroup[0].firstElementChild.value;
    const password = formGroup[1].firstElementChild.value;
    // validate user
    if (email != "" && password.length > 6) {
        userCreds.forEach( user => {
            if (user.email == email && user.password == password) {
                window.location.replace('dashboard.html');
            }
        });
    }
}

loginButton.addEventListener('click', validateUser);