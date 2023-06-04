// ********************
// Form validation
// ********************

const formEl = document.querySelector("form");

const password1El = document.querySelector("#password1");
const password2El = document.querySelector("#password2");
const messageContainer = document.querySelector(".message-container");
const sectionSignUp = document.querySelector("#signup");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // Using Constraint API
  isValid = formEl.checkValidity();
  //
  if (!isValid) {
    return;
  }
  //   Check to see if passwords match
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    messageContainer.textContent = "";
    password1El.style.borderColor = "none";
    password2El.style.borderColor = "none";
  } else {
    passwordsMatch = false;
    messageContainer.textContent = "Make sure passwords match";
    messageContainer.style.color = "red";
    messageContainer.style.fontWeight = "bold";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }
  //   If form is valid and passwords match
  if (isValid && passwordsMatch) {
    sectionSignUp.innerHTML = `<div class="row align-items-center animate__animated animate__backInUp">
    <div class="col-12 col-lg-6">
      <h2 class="mb-5">Welcome to the Lorem Pets World!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dicta
        incidunt quos rerum voluptates dignissimos quidem tempora possimus beatae
        maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dicta
        incidunt quos rerum voluptates dignissimos quidem tempora possimus beatae
        maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      <div class="mt-5">
        <a href="../index.html" class="button btn--full-blue">Continue</a>
      </div>
    </div>
  
    <div class="col-12 col-lg-6">
      <img src="../assets/pet2.png" alt="" />
    </div>
  </div>`;
  }
}

function storeFormData() {
  const user = {
    name: formEl.email.value,
    firstName: formEl.firstName.value,
    lastName: formEl.lastName.value,
    city: formEl.city.value,
    country: formEl.country.value,
    password: formEl.password.value,
  };
  // Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  //   Validate Form
  validateForm();
  // Submit data if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// Event listener
formEl.addEventListener("submit", processFormData);
