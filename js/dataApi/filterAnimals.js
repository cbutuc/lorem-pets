// ************************
// Filter based on species
// ************************

function filterAnimals(animalSpecies) {
  // Show loader
  cardsContainerOne.innerHTML = "";
  cardsContainerTwo.innerHTML = "";
  loaderOne.classList.remove("hide");
  loaderTwo.classList.remove("hide");
  // Call the API
  // This is a POST request, because we need the API to generate a new token for us
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      // Throw error
      if (!resp.ok) throw new Error(resp.status);
      // Return the response as JSON
      return resp.json();
    })
    .then(function (data) {
      // Log the API data
      console.log("token", data);

      // Return a second API call
      // This one uses the token we received for authentication
      return fetch(
        `https://api.petfinder.com/v2/animals?type=${animalSpecies}`,
        {
          headers: {
            Authorization: data.token_type + " " + data.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    })
    .then(function (resp) {
      // Throw error
      if (!resp.ok) throw new Error(resp.status);
      // Return the API response as JSON
      return resp.json();
    })
    .then(function (pets) {
      // Log the pet data
      console.log("pets animal category", pets);
      newAnimals = pets;
      //   Get the animals for container one
      cardsContainerOne.innerHTML = "";
      showAnimals(pets, cardsContainerOne, 4);
      //   Get the animals for container two
      cardsContainerTwo.innerHTML = "";
      showAnimals(pets, cardsContainerTwo, pets.animals.length);
      // hide loader
      loaderOne.classList.add("hide");
      loaderTwo.classList.add("hide");
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
      // Show error
      const divErr = `<h1 class="text-dark-brown">Pets could not be loaded. Please reload the page ${err}</h1>`;
      cardsContainerOne.innerHTML = divErr;
      cardsContainerTwo.innerHTML = divErr;
      // hide loader
      loaderOne.classList.add("hide");
      loaderTwo.classList.add("hide");
    });
}

// *****************************
// Filter based on filter match
// *****************************

const formEl = document.querySelector(".form");
const btnFilter = document.querySelector(".btn-filter");
let filterDetails = "";

// Event lisener
function storeFilterData() {
  const animal = {
    breed: formEl.breed.value,
    gender: formEl.gender.value,
    age: formEl.age.value,
    size: formEl.size.value,
  };
  filterDetails = animal;
  console.log("filter details", animal);
}

function filterMatch(filterDetails) {
  // Show loader
  cardsContainerOne.innerHTML = "";
  loaderOne.classList.remove("hide");

  const { breed, age, gender, size } = filterDetails;
  // Call the API
  // This is a POST request, because we need the API to generate a new token for us
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (resp) {
      // Throw error
      if (!resp.ok) throw new Error(resp.status);
      // Return the response as JSON
      return resp.json();
    })
    .then(function (data) {
      // Log the API data
      console.log("token", data);

      // Return a second API call
      // This one uses the token we received for authentication
      return fetch(
        `https://api.petfinder.com/v2/animals?type=${animalSpecies}&breed=${breed}&gender=${gender}&size=${size}&age=${age}`,
        {
          headers: {
            Authorization: data.token_type + " " + data.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    })
    .then(function (resp) {
      // Throw error
      if (!resp.ok) throw new Error(resp.status);
      // Return the API response as JSON
      return resp.json();
    })
    .then(function (match) {
      // Log the pet data
      console.log("match", match);

      // Add animals in Container one
      cardsContainerOne.innerHTML = "";
      showAnimals(match, cardsContainerOne, match.animals.length);
      // hide loader
      loaderOne.classList.add("hide");
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
      // Show error
      const divErr = `<h1 class="text-dark-brown">Pets could not be loaded. Please reload the page ${err}</h1>`;
      cardsContainerOne.innerHTML = divErr;
      // hide loader
      loaderOne.classList.add("hide");
    });
}

// Event listener
btnFilter.addEventListener("click", function (e) {
  e.preventDefault();
  storeFilterData();
  cardsContainerOne.scrollIntoView({ behavior: "smooth" });

  // Make sure to not let any filter input with "Any"
  let values = Object.values(filterDetails);
  if (values.every((value) => value !== "Any")) {
    filterMatch(filterDetails);
  } else {
    const h1 = `<h1 class="text-pink ">Please don't let any fields with 'Any'</h1>`;
    cardsContainerOne.textContent = "";
    cardsContainerOne.insertAdjacentHTML("afterbegin", h1);
  }
});
