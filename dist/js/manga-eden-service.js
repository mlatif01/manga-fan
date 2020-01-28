// HTTP Request Methods for Manga Eden Api
var baseMangaListURL = 'https://www.mangaeden.com/api/list/0';
var baseURL = 'http://localhost:3000/api/';
var baseMangaImgURL = 'https://cdn.mangaeden.com/mangasimg/';
var imgArr = [];

// Fetch Manga List only once, then set ID of manga in local storage
async function getMangaEdenChapter(title, chapter) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token'),
        }
    };

    // Fetch manga list
    const response = await fetch(baseURL+'mangaeden'+`/${title},${chapter}`, options);
    const data = await response.json();

    // push image data from chapters in an array so we can view the manga
    data.images.forEach(element => {
        imgArr.push(element[1]);
    });

}
