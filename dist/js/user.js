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
const logoutButton = document.getElementById('logout');

function validateUserFromDB() {
    const email = formGroup[0].firstElementChild.value;
    const password = formGroup[1].firstElementChild.value;
    // validate user
    if (email != "" && password.length > 6) {
        userCreds.forEach( user => {
            if (user.email == email && user.password == password) {
                localStorage.setItem('user', user);
                window.location.replace('dashboard.html');
            }
        });
    }
}

function onLogout() {
    console.log('clear');
    localStorage.clear();
}


if (loginButton) {
    loginButton.addEventListener('click', validateUserFromDB);
}
if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
}
