function getMoreAnimals(href) {
  // Show loader
  loaderThree.classList.remove("hide");
  // Call the API
  // This is a POST request, because we need the API to generate a new token for us\
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
      return fetch(`https://api.petfinder.com${href}`, {
        headers: {
          Authorization: data.token_type + " " + data.access_token,
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
    .then(function (animals) {
      // Log the pet data
      console.log("animals another page", animals);
      newAnimals = animals;

      showAnimals(newAnimals, cardsContainerTwo, newAnimals.animals.length);
      // Hide loader
      loaderThree.classList.add("hide");
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
      // Show Error
      const divErr = `<h1 class="text-dark-brown">Pets could not be loaded. Please reload the page ${err}</h1>`;
      cardsContainerTwo.insertAdjacentHTML("afterend", divErr);
      // Hide loader
      loaderThree.classList.remove("hide");
    });
}
