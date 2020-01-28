// Get manga information from query string
const queryParams = getQueryParams(window.location.href);
const mangaInfo = {
    id: queryParams.id,
    title: queryParams.title,
    chapter: queryParams.chapter
}

// images will be from right to left
const chapterImgArr = [];
var baseMangaImgURL = 'https://cdn.mangaeden.com/mangasimg/';

// DOM Elements
const mangaHeaderH1 = document.getElementById('manga-header-heading');
const mangaImg = document.getElementById('manga-img');

// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
async function startup() {
    if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
    // Set up the page
    } else {
        // Display Manga Name
        mangaHeaderH1.innerHTML = `${mangaInfo.title} - Chapter ${mangaInfo.chapter} / p1`

        // Retrieve Manga Chapter
        const chapterData = await getMangaEdenChapter(mangaInfo.title, mangaInfo.chapter);
        
        // push image data from chapters in an array so we can view the manga
        chapterData.images.forEach(element => {
            chapterImgArr.push(element[1]);
        });

        // reverse arr for easier navigation
        chapterImgArr.reverse();

        // display first page of the manga
        mangaImg.setAttribute("src", baseMangaImgURL + chapterImgArr[0]);

    }
}

// Functions

// Event Handlers

startup();