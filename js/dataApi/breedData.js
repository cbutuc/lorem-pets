function getBreeds(animalSpecies) {
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
    .then(function (data) {
      // Log the API data
      console.log("token", data);

      // Return a second API call
      // This one uses the token we received for authentication
      return fetch(
        `https://api.petfinder.com/v2/types/${animalSpecies}/breeds`,
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
    .then(function (breeds) {
      // Log the pet data
      console.log("breeds", breeds);

      // adding the breeds to the input fields !!!
      const inputElm = document.getElementById("breed");
      inputElm.innerHTML = `<option selected>Any</option>`;
      breeds.breeds.forEach((breed) => {
        const option = document.createElement("option");
        inputElm.appendChild(option);
        option.textContent = breed.name;
      });
      // ------------------------
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });
}
