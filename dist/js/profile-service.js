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

    try {
        // Send get request to server
        const response = await fetch(baseURL+'profile', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
    
}

// get all profiles with username data
async function getAllProfiles() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('user-token')
        }
    }

    try {
        const response = await fetch(baseURL+'profile/otaku', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }

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
    for (let i = 0, len = profileInputs.length; i < len; i++) {
        profileData[profileInputs[i].name] = profileInputs[i].value;
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
    
    try {
        // Send post request to server
        const response = await fetch(baseURL+'profile', options);
        const data = await response.json();
        
        setTimeout(()=>{
            location.reload();
        }, 1000)
        toastr.success("Profile Added Successfully");
        return data;
    } catch(err) {
        console.log(err);
    }
}

async function editProfile(e) {
    // prevent page from navigating to another page on submit
    e.preventDefault();

    const profileData = {
        about: undefined,
        age: undefined,
        instagram: undefined
    }

    // parse info from input fields
    for (let i = 0, len = profileInputs.length; i < len; i++) {
        profileData[profileInputs[i].name] = profileInputs[i].value;
    }

    const options = {
        method: 'PUT',
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

    try {
        // Send post request to server
        const response = await fetch(baseURL+'profile', options);
        const data = await response.json();
        toastr.info("Profile Edited Successfully");

        return data;
    } catch(err) {
        console.log(err);
    }

    
}
