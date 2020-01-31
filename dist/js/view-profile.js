// Dom Elements and variables
let mangaTitleFav = undefined;
// hack - used to reset state of input variable in manga-service
let mangaInputs = undefined;
const profileTop = document.querySelector(".profile-top");
const usernameTop = document.getElementById("username-top");
const instagramLink = document.getElementById("instagram-link");
const aboutHeading = document.getElementById("about-heading");
const aboutBio = document.getElementById("about-bio");
const favMangaDiv = document.querySelector(".profile-favmanga");


// -- Functions

// Setup Function
// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
async function setupViewProfile() {
    if (checkUserToken()) {
    } else {
        // set up logout button
        setUpLogout();
    
        // retrieve profile data
        const arrOfUsers = await getAllProfiles();

        // get query string id param
        const queryParams = getQueryParams(window.location.href);
        const userId = queryParams.id;

        arrOfUsers.forEach( user => {
            // update user top and about first then fav mangas
            if (user.userId === userId) {
                // set username top
                usernameTop.innerHTML = user.username;
                // set instagram link href
                instagramLink.href = user.instagram;
                // set about heading and bio
                aboutHeading.innerHTML = "About "+user.username;
                aboutBio.innerHTML = user.about;

                // create div for each fav manga
                // n**2 solution! Improve!!!
                if (user.favmangas != null) {
                    for (manga of user.favmangas) {
                        favMangaDiv.innerHTML += `
                        <div class="manga bg-white my-1 p-1">
                            <div>
                                <h4>${manga.title}</h4>
                                <p>Description</p>
                                <a href="#" class="add-fav-btn btn btn-primary my-1">Add To Fav</a>
                            </div>
                            <div>
                                <ul>
                                    <li class="badge badge-dark"><strong>Author: </strong>${manga.author}</li>
                                    <li class="badge badge-primary"><strong>Title: </strong>${manga.title}</li>
                                    <li class="badge badge-light"><strong>Latest Chapter: </strong>${manga.latestChapter}</li>
                                    <li class="badge badge-light"><strong>Latest Read: </strong>${manga.lastRead}</li>
                                </ul>
                            </div>
                        </div>
                        `
                    }
                }
            }
        });
    }
    let addToFavBtn = document.querySelectorAll(".manga .add-fav-btn");
    addToFavBtn.forEach(elem => {
        elem.addEventListener('click', addToFav);
    });
}

function addToFav(e) {
    const btn = e.target;
    // find name of manga to add
    mangaTitleFav = btn.parentNode.getElementsByTagName("h4")[0].innerHTML;
    // call postmanga
    postManga(e);
}

setupViewProfile();

// -- Event Handlers

