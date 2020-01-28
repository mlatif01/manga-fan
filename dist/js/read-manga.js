// Get manga information from query string
const queryParams = getQueryParams(window.location.href);
const mangaInfo = {
    id: queryParams.id,
    title: queryParams.title,
    chapter: queryParams.chapter
}

const mangaChapter = [];

// DOM Elements
const mangaHeaderH1 = document.getElementById('manga-header-heading');

// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
// Set up the page
} else {
    // Display Manga Name
    mangaHeaderH1.innerHTML = `${mangaInfo.title} - Chapter ${mangaInfo.chapter} / p1`

    // Retrieve Manga Chapter
    getMangaEdenChapter(mangaInfo.title, mangaInfo.chapter);
}

// Functions

// Event Handlers