// HTTP Request Methods for Manga Eden Api
var baseMangaListURL = 'https://www.mangaeden.com/api/list/0';
var baseURL = 'http://localhost:3000/api/';

// Fetch Manga List only once
async function getMangaEdenChapter(title, chapter) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token'),
        }
    };

    try {
        // Fetch manga list
        const response = await fetch(baseURL+'mangaeden'+`/${title},${chapter}`, options);
        const data = await response.json();

        console.log("received manga chapter data");
        return data;
    } catch (err) {
        console.log(err);
    }
}

