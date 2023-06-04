// ************************************
// Smooth Scrolling Section Pet Gallery
// ************************************

const btnScrollTo = document.querySelector(".btn-scroll-to");
const sectionPetGallery = document.querySelector(".section-pet-gallery");

btnScrollTo.addEventListener("click", function () {
  sectionPetGallery.scrollIntoView({ behavior: "smooth" });
});

// *******************************
// MAKE PETS BUTTONS ACTIVE IF YOU CLICK
// *******************************

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", function (e) {
  //   Matching Strategy
  if (e.target.classList.contains("btn-search")) {
    // Make pet button active
    const current = document.querySelector(".active");
    current.classList.remove("active");
    e.target.classList.add("active");
  }
});
