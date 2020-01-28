// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
} else {
    // Display Username
    getUserData().then( data => {
        userProfile = data;
        usernameHeading.innerHTML += userProfile.username;
     })

    // Retrieve Manga Data
    getMangaData().then( data => {
        mangaData = data;
        // Populate fav manga table
        populateMangaTable();
    });
}

let mangaData = undefined;

// DOM Elements
const usernameHeading = document.getElementById('username-heading');
const logoutButton = document.getElementById('logout');
const openModalElems = document.querySelectorAll("[data-open]");
const modalIsVisible = "is-visible";
const closeModalElems = document.querySelectorAll("[data-close]");
const mangaInputs = document.querySelectorAll(".form-field");
const mangaForm = document.getElementById('manga-form');
const mangaTableBody = document.getElementById('manga-table-body');

// Functions
function populateMangaTable() {
    // keep track of the number of mangas
    var numOfMangas = 0;
    // Loop through every manga item
    for (const manga of mangaData) {
        // Create an empty <tr> element and add to the 1st position of the table
        var mangaObj = {
            author: manga.author,
            title: manga.title,
            releaseYear: manga.releaseYear,
            latestChapter: manga.latestChapter,
            lastRead: manga.lastRead,
            mangaId: manga._id
        }
        console.log(mangaObj);
        
        let row = mangaTableBody.insertRow();
        row.setAttribute('id', mangaObj.mangaId);

        numOfMangas += 1;

        for (let i = 0, len = Object.keys(manga).length - 1; i < len; i++) {
            // Insert new cells (<td> elements) in <tr>
            let cell = row.insertCell();
            // Get keys for manga 
            let key = Object.keys(mangaObj)[i];

            // Add del button to last cell
            if (i === len - 1) {
                cell.innerHTML = `
                <button class="btn btn-sm btn-danger" id="del-manga-${numOfMangas}"
                    data-open="manga-modal">
                    <i class="fas fa-minus"></i>
                </button></th>
                `;

                // add event listener to del button
                const delMangaBtn = document.getElementById('del-manga-' + numOfMangas);
                delMangaBtn.addEventListener('click', deleteManga);
            } else {
                cell.innerHTML = typeof(mangaObj[key]) === "string" ? mangaObj[key].toUpperCase() : mangaObj[key];
                cell.setAttribute('onclick', `window.location='readmanga.html?uri=key&id=${mangaObj.mangaId}&title=${mangaObj.title}&chapter=${mangaObj.lastRead}'`);    
            }
        }
    }
}

// Event Handlers
if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
}

mangaForm.addEventListener('submit', postManga);

// Modal Events
// Open Modal
for(const elem of openModalElems) {
    elem.addEventListener("click", function() {
        mangaForm.reset();
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


