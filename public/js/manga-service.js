// HTTP Request Methods for Fav Manga
var baseURL = 'http://localhost:5000/api/';

async function getMangaData() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        }
    }

    try {
        // Send get request to server
        const response = await fetch(baseURL+'favmanga', options);
        const data = await response.json();
        return data;       
    } catch (err) {
        toastr.warning("Manga Not Available");
        console.log(err);
    }
}

async function postManga(e) {
    e.preventDefault();

    const mangaData = {
        author: "undefined",
        title: "undefined",
        releaseYear: 1900,
        latestChapter: 1,
        lastRead: 1
    };

    if (mangaInputs !== undefined) {
        // parse info form input fields
        for (let i = 0, len = mangaInputs.length; i < len; i++) {
            mangaData[mangaInputs[i].name] = mangaInputs[i].value;
        }
    }

    if (mangaTitleFav !== undefined) {
        mangaData.title = mangaTitleFav;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        },
        // Serialize json data
        body: JSON.stringify({
            author: "#",
            title: mangaData.title,
            releaseYear: parseInt(mangaData.releaseYear),
            latestChapter: parseInt(mangaData.latestChapter),
            lastRead: parseInt(mangaData.lastRead)
        })
    }

    try {
        // Send post request to server
        const response = await fetch(baseURL+'favmanga', options);
        const data = await response.json();
        toastr.success("Manga Added Successfully");
        setTimeout(()=>{
            location.reload();
        }, 1000)
    } catch(err) {
        console.log();
        toastr.warning("Manga Could Not Be Added");
    }

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
            toastr.info("Manga Deleted Successfully");
            setTimeout(()=>{
                location.reload();
            }, 1000)
        } catch(err) {
            console.log(err);
        }    
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
            newLastRead: parseInt(e.target.innerHTML),
            oldLastRead: parseInt(oldLastRead)
        })
    };

    try {
        // Send post request to server
        const response = await fetch(baseURL+'favmanga', options);
        const data = await response.json();
        toastr.info("Manga Edited Successfully");
        setTimeout(()=>{
            location.reload();
        }, 1000)
    } catch (err) {
        console.log(err);
    }
    
}
