// Definition of Elements
let form = document.querySelector("form");
let avatarField = document.querySelector(".avatar-field");
let errorAvatar = document.querySelector(".error-avtar");
let nameField = document.querySelector(".name-field");
let errorName = document.querySelector(".error-name");
let emailField = document.querySelector(".email-field");
let errorEmail = document.querySelector(".error-email");
let githubField = document.querySelector(".github-field");
let errorGithub = document.querySelector(".error-github");
let submitBtn = document.querySelector(".submit-btn");
let uploadLabel = document.querySelector(".upload-avatar label");
let boxTicket = document.querySelector(".box-ticket");
let boxInfo = document.querySelector(".info");
let userName = document.querySelector(".user-name");
let userEmail = document.querySelector(".email-user");
let userNemeTicket = document.querySelector(".name-user");
let UserGithubTicket = document.querySelector(".github-user");
let UserProfileTicket = document.querySelector(".user-profile");
let ticketCount = document.querySelector(".ticket-number");
 

// Form Data Submission Event
form.addEventListener("submit", (e) => {
  let data = handleSubmit();
  if (!data) {
    return
  } else {
    e.preventDefault();
    removForm();
    showTicket(data);
  }
});

// Handling and calling all functions here
function handleSubmit() {
  const userData = {
    avatarImge: avatarField.files[0],
    fullName: nameField.value.trim(),
    email: emailField.value,
    githubUser: githubField.value.trim(),
  };
  const avatarError = avatarValidation(userData.avatarImge);
  const nameError = nameValidation(userData.fullName);
  const emailError = emailValidation(userData.email);
  const gitHubError = gitHubValidation(userData.githubUser);

  showError(avatarError, nameError, emailError, gitHubError);

  if (avatarError && nameError && emailError && gitHubError) {
    return userData;
  } else {
    return false;
  }
}

// validation avatarField  Inputs
function avatarValidation(avatar) {
  if (!avatar) {
    return false;
  }

  let sizeAvatar = avatar.size;
  let sizeKb = sizeAvatar / 1024;
  let maxSize = 1000;

  if (!avatar || sizeKb > maxSize) {
    return false;
  }
  return true;
}

// validation Name Fiel
function nameValidation(name) {
  let isvalid = true;
  if (!name) {
    isvalid = false;
  }
  return isvalid;
}

// validation Email

function emailValidation(email) {
  let patrenEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isvalid = true;
  if (!email || !patrenEmail.test(email)) {
    isvalid = false;
  }
  return isvalid;
}
// validation userNmae of github
function gitHubValidation(github) {
  let isvalid = true;
  let patrenGitHub = /^@[a-zA-Z][a-zA-Z0-9-]*$/;
  if (!github || !patrenGitHub.test(github)) {
    isvalid = false;
  }
  return isvalid;
}
// Function to Error display machine  Error log after error detection
function showError(avatarError, nameError, emailError, githubError) {
  if (!avatarError) {
    errorAvatar.classList.add("show");
  } else {
    errorAvatar.classList.remove("show");
  }

  if (!nameError) {
    errorName.classList.add("show");
  } else {
    errorName.classList.remove("show");
  }

  if (!emailError) {
    errorEmail.classList.add("show");
  } else {
    errorEmail.classList.remove("show");
  }
  if (!githubError) {
    errorGithub.classList.add("show");
  } else {
    errorGithub.classList.remove("show");
  }
}

// Function to display the image in the  avtar field
function showAvtar(file) {
  const reder = new FileReader();
  reder.onload = function (e) {
    // Add user photo
    const avtarUser = uploadLabel.querySelector("img");
    avtarUser.src = e.target.result;
    avtarUser.alt = "user image";
    avtarUser.classList.add("owner");
    const info = uploadLabel.querySelector("p");
    info.classList.add("none");
    avatarField.classList.add("none");

    // Create div of buttons
    let boxBtn = document.createElement("div");
    boxBtn.classList.add("box-of-btn");
    // Create butttin of change
    let changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change Image";
    changeBtn.type = "button";
    // Create button of  remove
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove Image";
    removeBtn.type = "button";
    boxBtn.appendChild(removeBtn);
    boxBtn.appendChild(changeBtn);

    // Add Event to button
    removeBtn.addEventListener("click", () => {
      removeAvtar(boxBtn);
    });
    changeBtn.addEventListener("click", () => {
      avatarField.value = "";
      avatarField.click();
    });
    // To prevent duplicate entries
    if (!uploadLabel.querySelector(".box-of-btn")) {
      uploadLabel.appendChild(boxBtn);
    }
  };
  reder.readAsDataURL(file);
}

// Function To Remove Avtar
function removeAvtar(btnBox) {
  // Restore the avatar field to its default state and clear its value
  const avtarUser = uploadLabel.querySelector("img");
  avtarUser.src = "images/icon-upload.svg";
  avtarUser.alt = "error icon upload";
  avtarUser.classList.remove("owner");
  avatarField.classList.remove("none");
  avatarField.value = "";
  const info = uploadLabel.querySelector("p");
  info.classList.remove("none");
  btnBox.remove();
}
// event at change imge
avatarField.addEventListener("change", function () {
  let file = avatarField.files[0];
  const isValidFile = avatarValidation(file);

  if (isValidFile) {
    showAvtar(file);
    errorAvatar.classList.remove("show");
  } else {
    errorAvatar.classList.add("show");
    clear();
  }
});

// Add an event to correct typos 
nameField.addEventListener("input", function () {
errorName.classList.remove("show")
})
githubField.addEventListener("input", function () {
errorGithub.classList.remove("show")
})
emailField.addEventListener("input", function () {
errorEmail.classList.remove("show")
})
// clear its value
function clear() {
  avatarField.value = "";
}
//  Number Generation
function NumberGeneration() {
  let count = localStorage.getItem("ticketCount");
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count);
  }
  let id = "#" + String(count).padStart(5, "0");
  count++;
  localStorage.setItem("ticketCount", count);
  return id;
}

// Function to remove items from the ticket
function removForm() {
  form.classList.add("none");
  boxInfo.classList.add("none");
}

// Function to to show ticket
function showTicket(data) {
  boxTicket.classList.remove("none");
  //  Add text of titel
  userName.textContent = data.fullName;
  userEmail.textContent = data.email;

  //  Add text of info Ticket
  userNemeTicket.textContent = data.fullName;
  UserGithubTicket.textContent = data.githubUser;
  ticketCount.textContent = NumberGeneration();
  // Add profile
  let reder = new FileReader();
  reder.onload = function (e) {
    UserProfileTicket.src = e.target.result;
  };
  reder.readAsDataURL(data.avatarImge);
}
