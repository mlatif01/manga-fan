// HTTP Request Methods for Profile
var baseURL = 'http://localhost:3000/api/';

async function getProfileData() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        }
    }

    // Send get request to server
    const response = await fetch(baseURL+'profile', options);
    const data = await response.json();
    
    console.log(data);
    return data;
}

async function postProfile(e) {
    // prevent page from navigating to another page on submit
    e.preventDefault();

    const profileData = {
        about: undefined,
        age: undefined,
        instagram: undefined
    }

    // parse info from input fields
    for (let i = 0, len = inputs.length; i < len; i++) {
        profileData[inputs[i].name] = inputs[i].value;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        },
        // Serialize json data
        body: JSON.stringify({
            about: profileData.about,
            age: parseInt(profileData.age),
            instagram: profileData.instagram
        })
    }

    console.log(options.body);
    
    try {
        // Send post request to server
        const response = await fetch(baseURL+'profile', options);
        const data = await response.json();
    } catch(err) {
        console.log(err);
    }

    location.reload(true);

}