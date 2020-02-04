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
var pageNumber = 0;

// DOM Elements
const mangaHeaderH1 = document.getElementById('manga-header-heading');
const mangaImg = document.getElementById('manga-img');
const prevBtn = document.querySelector('.manga-prev a');
const nextBtn = document.querySelector('.manga-next a');


// Authorisation to allow user to access certain resources
// Check if local storage has user details (temp)
async function startup() {
    if (localStorage.getItem('user-token') == null) {
    window.location.replace('index.html');
    // Set up the page
    } else {
        // set up logout button
        setUpLogout();
        
        // Display Manga Name, chapter and pn
        updateChapterInfo();

        // Retrieve Manga Chapter
        const chapterData = await getMangaEdenChapter(mangaInfo.title, mangaInfo.chapter);
        
        // push image data from chapters in an array so we can view the manga
        chapterData.images.forEach(element => {
            chapterImgArr.push(element[1]);
        });

        // reverse arr for easier navigation
        chapterImgArr.reverse();

        // display first page of the manga
        mangaImg.setAttribute("src", baseMangaImgURL + chapterImgArr[pageNumber]);

    }
}

// Functions
function nextPage(e) {
    if (pageNumber < chapterImgArr.length - 1) {
        mangaImg.setAttribute("src", baseMangaImgURL + chapterImgArr[pageNumber + 1]);
        pageNumber += 1;
        updateChapterInfo();
    }
}

function prevPage(e) {
    if (pageNumber >= 1) {
        mangaImg.setAttribute("src", baseMangaImgURL + chapterImgArr[pageNumber - 1]);
        pageNumber -= 1;
        updateChapterInfo();
    }
}

function updateChapterInfo() {
    mangaHeaderH1.innerHTML = `${mangaInfo.title} - Chapter: ${mangaInfo.chapter} / Page: ${pageNumber + 1}`
}

// Event Handlers
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);

// change page when left or right is clicked
document.addEventListener('keydown', (e) => {
    const key = e.key;
    console.log(e.key);
    switch (key) {
        case "ArrowLeft":
            prevPage();
            break;
        case "ArrowRight":
            nextPage();
            break;
    }
});

startup();