// DOM Selectors
const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');
const watchout = document.getElementById('watchout');
const shurikenSound = new Audio('./resources/shuriken.mp3');

// Functions
function endShuriken(e) {
    if (e.target.shurikenFired && !e.target.shurikenEnd) {
        console.log("ON");
        // Get image inside btn 
        const img = e.target.getElementsByTagName('img')[0];
        img.style = "padding: 0 0 0 0";
        e.target.shurikenEnd = true;
    }
}

function shurikenAttack(e) {
    if (!e.target.shurikenFired) {
        console.log("OFF");
        // play shuriken sound
        shurikenSound.play();
        // Get image inside btn and change padding
        const img = e.target.getElementsByTagName('img')[0];
        img.style = "padding: 0 0 0 0;";
        shurikenSound.playbackRate = 1.8; // speed up
        shurikenSound.currentTime = 0; // rewind to the start so we can call many times
        e.target.shurikenFired = true;
        watchout.style = "opacity: 1;";
    }
}

// Event Handlers
btnRegister.addEventListener('mouseleave', shurikenAttack);
btnLogin.addEventListener('mouseleave', shurikenAttack);
btnRegister.addEventListener('mouseenter', endShuriken);
btnLogin.addEventListener('mouseenter', endShuriken);

// Set Shuriken Props
btnRegister.shurikenFired = false;
btnLogin.shurikenFired = false;
btnRegister.shurikenEnd = false;
btnLogin.shurikenEnd = false;
