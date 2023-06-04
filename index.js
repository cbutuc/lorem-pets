// ***********************************
// Making the mobile navigation work
// ***********************************
const navbar = document.querySelector(".navbar");
const btnNav = document.querySelector(".btn-mobile-nav");
const navLinks = document.querySelectorAll(".nav-link");

const activePage = window.location.href;

// Open/Close mobile navigation

btnNav.addEventListener("click", function () {
  navbar.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  // Close mobile navigation when you click the nav-link
  link.addEventListener("click", function () {
    navbar.classList.remove("nav-open");
  });

  // Show Active nav-link
  if (link.href === activePage) {
    link.setAttribute("aria-current", "page");
  }
});

// *******************
// Sticky navigation
// ********************

const navbarDiv = document.querySelector(".header > div");
const sectionTop = document.querySelector(".section-top");

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navbarDiv.classList.add("sticky");
  } else {
    navbarDiv.classList.remove("sticky");
  }
};

const opt = {
  root: null,
  threshold: 0.4,
};

const topSectionObserver = new IntersectionObserver(stickyNav, opt);
topSectionObserver.observe(sectionTop);

// ******************************
// Reveal Sections on scroll
// ***********************************

const allSections = document.querySelectorAll(".section");

const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  section.classList.add("section-hidden");
  sectionObserver.observe(section);
});
