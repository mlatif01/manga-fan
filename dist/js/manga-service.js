// HTTP Request Methods for Fav Manga
var baseURL = 'http://localhost:3000/api/';

async function getMangaData() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        }
    }

    // Send get request to server
    const response = await fetch(baseURL+'favmanga', options);
    const data = await response.json();
    
    return data;
}

async function postManga(e) {
    e.preventDefault();

    const mangaData = {
        author: undefined,
        title: undefined,
        releaseYear: undefined,
        latestChapter: undefined,
        lastRead: undefined
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
            latestChapter: parseInt(mangaData.latestChapter), 
            lastRead: parseInt(mangaData.lastRead)
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

async function deleteManga(e) {
    e.preventDefault();

    const flag = confirm('Are you sure you want to delete this item?');

    // Tedious!
    const mangaId = e.target.parentElement.parentElement.parentElement.id;

    if (flag) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('user-token')
            },
            // Serialize json data
            body: JSON.stringify({
                mangaId: mangaId
            })
        };
    
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
}

async function editManga(e, mangaId, oldLastRead) {
    e.preventDefault();

    console.log("call from client");
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        },
        // Serialize json data
        body: JSON.stringify({
            mangaId: mangaId,
            newlastRead: parseInt(e.target.innerHTML),
            oldLastRead: parseInt(oldLastRead)
        })
    };

    try {
        // Send post request to server
        const response = await fetch(baseURL+'favmanga', options);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    

}
