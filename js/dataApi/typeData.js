// ex: cat, dog etc
let animalSpecies = "";

function resetOptionsForInput() {
  const inputs = document.querySelectorAll(".feature");
  inputs.forEach((input) => {
    input.innerHTML = `<option selected>Any</option>`;
  });
}

function addOptionsForInput(e, types, selectedElem, animalFeatures) {
  const inputEl = document.getElementById(selectedElem);
  // Reset the options when you press a pet species button
  inputEl.innerHTML = `<option selected>Any</option>`;
  //   Matching Strategy
  if (e.target.classList.contains("btn-search")) {
    // Accesing the objects form types array
    types.types.forEach((type) => {
      if (e.target.textContent.includes(type.name.toLowerCase())) {
        // Adding options for input
        const features = type[animalFeatures];
        console.log("features", features);
        features.forEach((feature) => {
          const option = document.createElement("option");
          inputEl.appendChild(option);
          option.textContent = feature;
        });
      }
    });
  }
}

// Call the API
// This is a POST request, because we need the API to generate a new token for us
fetch("https://api.petfinder.com/v2/oauth2/token", {
  method: "POST",
  body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
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
  .then(function (token) {
    // Log the API data
    console.log("token", token);

    // Return a second API call
    // This one uses the token we received for authentication
    return fetch("https://api.petfinder.com/v2/types", {
      headers: {
        Authorization: token.token_type + " " + token.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  })
  .then(function (resp) {
    // Throw error
    if (!resp.ok) throw new Error(resp.status);
    // Return the API response as JSON
    return resp.json();
  })
  .then(function (types) {
    // Log the pet data
    console.log("types", types);

    // Add options for dropdowns
    buttons.addEventListener("click", function (e) {
      // Matching strategy
      if (e.target.classList.contains("btn-search")) {
        // get the species
        animalSpecies = e.target.textContent.substring(
          0,
          e.target.textContent.length - 1
        );

        // If you click the "all" button
        if (e.target.textContent === "all") {
          resetOptionsForInput();

          // Restore all the animals
          cardsContainerOne.innerHTML = "";
          cardsContainerTwo.innerHTML = "";
          getAnimals();
        } else {
          // If you click the other pet button
          addOptionsForInput(e, types, "gender", "genders");

          // Get the breeds options with another API call
          getBreeds(animalSpecies);
          console.log(animalSpecies);

          // Filter the animals based on species
          filterAnimals(animalSpecies);
        }
      }
    });
  })

  .catch(function (err) {
    // Log any errors
    console.log("something went wrong", err);
  });
