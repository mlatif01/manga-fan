// HTTP Request Methods for Profile
var baseURL = 'http://localhost:3000/api/';

async function postManga(e) {
    e.preventDefault();

    const mangaData = {
        author: undefined,
        title: undefined,
        releaseYear: undefined,
        latestChapter: undefined
    }

    // parse info form input fields
    for (let i = 0, len = mangaInputs.length; i < len; i++) {
        mangaData[mangaInputs[i].name] = mangaInputs[i].value;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        },
        // Serialize json data
        body: JSON.stringify({
            author: mangaData.author,
            title: mangaData.title,
            releaseYear: parseInt(mangaData.releaseYear),
            latestChapter: parseInt(mangaData.latestChapter)
        })
    }

        console.log(options.body);

    try {
    // Send post request to server
    const response = await fetch(baseURL+'favmanga', options);
    const data = await response.json();
    console.log(data);
    } catch(err) {
        console.log(err);
    }

    location.reload(true);

}
