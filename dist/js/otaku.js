// DOM Elements
const profiles = document.querySelector(".profiles");

// Setup Function
// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
async function setupOtaku() {
    if (checkUserToken()) {
    } else {
        // set up logout button
        setUpLogout();
    
        // retrieve profile data
        const arrOfUsers = await getAllProfiles();

        // populate profile cards with user info
        populateProfileCards(arrOfUsers);
    };
}

// Functions
function populateProfileCards(arrOfUsers) {
    let i = 1;

    for (userProfile of arrOfUsers) {
        // counter variable
        profiles.innerHTML += `
        <a href="#" class="otaku-card btn-${i}">
            <div id="${userProfile.userId}" class="profile bg-light">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png" 
                    alt="dev" class="round-img">
                <div>
                    <h2>${userProfile.username}</h2>
                    
                </div>
                <div>
                    <ul id="fav-manga-list-${i}">
                    
                    </ul>
                </div>
            </div>
        </a>
            
        `
        // n**2 solution! Improve!!!
        let j = 1;
        if (userProfile.favmangas != null) {
            const favMangaList = document.getElementById(`fav-manga-list-${i}`);
            for (manga of userProfile.favmangas) {
                favMangaList.innerHTML += `
                    <li class="text-primary">
                        <i class="fas fa-book-reader"></i> ${manga.title}
                    </li>
                ` 
            }
        }
        // target edit profile button and add onclick attribute
        let editProfileBtn = document.querySelector(`.profiles .btn-${i}`);
        editProfileBtn.setAttribute('onclick', `window.location='view-profile.html?uri=key&id=${userProfile.userId}'`); 
        // increment counter
        i += 1;
    }
}

// Event Handlers


setupOtaku();