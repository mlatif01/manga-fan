// HTTP Request Methods for User
// var baseURL = "http://localhost:3000/api/";
var baseURL = "https://159.65.86.190/api";

// Functions
async function getUserData() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("user-token")
    }
  };

  // Send get request to server
  try {
    const response = await fetch(baseURL + "user", options);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function login(e) {
  // prevent page from navigating to another page on submit
  e.preventDefault();

  const email = formGroup[0].firstElementChild.value;
  const password = formGroup[1].firstElementChild.value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // Serialize json data
    body: JSON.stringify({
      email: email,
      password: password
    })
  };

  try {
    // Send post request to server
    const response = await fetch(baseURL + "user/login", options);
    const data = await response.json();

    toastr.success("Login Successful");

    // wait a few seconds so user can see toastr message
    setTimeout(() => {
      if (data.token != null) {
        localStorage.setItem("user-token", data.token);
        window.location.replace("dashboard.html");
      }
    }, 1000);
  } catch (err) {
    toastr.error("Login Unsuccessful");
    console.log(err);
  }
}

async function register(e) {
  // prevent page from navigating to another page on submit
  e.preventDefault();

  // Check password fields are the same
  const password = formGroup[2].firstElementChild.value;
  const checkPassword = formGroup[3].firstElementChild.value;
  if (password != checkPassword) {
    console.log("Password does not match!");
    return;
  }

  const username = formGroup[0].firstElementChild.value;
  const email = formGroup[1].firstElementChild.value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // Serialize json data
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  };

  try {
    // Send post request to server
    const response = await fetch(baseURL + "user/register", options);
    const data = await response.json();
    toastr.success("Registration Successful");

    setTimeout(() => {
      window.location.replace("login.html");
    }, 1000);
  } catch (err) {
    toastr.error("Registration Unsuccessful");
    console.log(err);
  }
}

function onLogout() {
  localStorage.clear();
  window.location.replace("index.html");
}
