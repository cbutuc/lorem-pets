// API KEY + SECRET
const key = "NG7iJ5tcLTBaNLhfEfROkamy8o2u4KTkkacjQXXzREQJfsXFlk";
const secret = "zyqJhSGmfn641brweFMe3e7TTQg60wRFBcMnRlO7";

// Select the elements
const cardsContainerOne = document.querySelector(".cards-container-one");
const cardsContainerTwo = document.querySelector(".cards-container-two");
const btnMore = document.querySelector(".btn-more");

const loaderOne = document.querySelector(".loader1");
const loaderTwo = document.querySelector(".loader2");
const loaderThree = document.querySelector(".loader3");

let newAnimals = [];

function showAnimals(animals, container, num) {
  // If there is no match
  if (!animals.animals.length) {
    const h1 = `<h1 class="text-pink ">No match for your filter!!</h1>`;
    container.insertAdjacentHTML("afterbegin", h1);
    // If there is a match
  } else {
    for (let i = 0; i < num; i++) {
      if (animals.animals[i].photos.length) {
        const myCard = `<div class="card border-0">
                    <img
                      src="${animals.animals[i].photos[0].full}"
                      class="card-img-top"
                      alt=""
                    />

                    <div class="card-body flow">
                      <h3 class="card-title uppercase">${
                        animals.animals[i].name.split(" ")[0]
                      }</h3>
                      <p class="card-text">
                        Some quick example text to build on the card title and make up
                        the bulk of the card's content.
                      </p>
                      <a href="${
                        animals.animals[i].url
                      }" class="button mb-3" target=”_blank”>Visit profile</a>
                    </div>
                  </div>`;

        container.insertAdjacentHTML("beforeend", myCard);
      } else {
        const myCard = `<div class="card border-0">
                    <img
                      src="../../assets/image-not-found.png"
                      class="card-img-top"
                      alt=""
                    />

                    <div class="card-body flow">
                      <h3 class="card-title uppercase">${
                        animals.animals[i].name.split(" ")[0]
                      }</h3>
                      <p class="card-text">
                        Some quick example text to build on the card title and make up
                        the bulk of the card's content.
                      </p>
                      <a href="${
                        animals.animals[i].url
                      }" class="button mb-3" target=”_blank”>Visit profile</a>
                    </div>
                  </div>`;

        container.insertAdjacentHTML("beforeend", myCard);
      }
    }
  }
}

function getAnimals() {
  // Show loader
  loaderOne.classList.remove("hide");
  loaderTwo.classList.remove("hide");
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
      return fetch("https://api.petfinder.com/v2/animals", {
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
    .then(function (animals) {
      // Log the pet data
      console.log("all animals", animals);

      newAnimals = animals;

      // Get the animals in container one
      showAnimals(animals, cardsContainerOne, 4);

      // Get the animals in container two
      showAnimals(animals, cardsContainerTwo, animals.animals.length);

      // Get more animals when you click the show more button
      btnMore.addEventListener("click", function () {
        getMoreAnimals(newAnimals.pagination["_links"].next.href);
      });
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

getAnimals();
