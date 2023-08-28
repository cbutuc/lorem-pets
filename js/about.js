// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

let touchstartX = 0;
let touchendX = 0;

const goToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};

goToSlide(0);

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

// Event listener
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Finger swipe
function checkDirection() {
  if (touchendX < touchstartX) nextSlide();
  if (touchendX > touchstartX) prevSlide();
}

slides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  slide.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
});
