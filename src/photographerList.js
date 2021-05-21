import fetchData from "./utils/modules/fetchingData.js";
import photographerCardMarkup from "./utils/modules/photographerCardMarkup.js";

//Selectors:
const tags = document.querySelectorAll(".tag");
const logo = document.querySelector(".header__logo");
const photographersContainer = document.querySelector(".cards-container");

// functions
const handleActive = (e) => {
  tags.forEach((tag) => {
    tag.classList.remove("active");
  });
  e.target.classList.contains("tag") && e.target.classList.add("active");
};

const showFilter = (category) => {
  fetchData().then(({ photographers }) => {
    let filterdPhotographer = [];

    photographers.map((photographer) => {
      if (photographer.tags.includes(category)) {
        filterdPhotographer = [...filterdPhotographer, photographer];
      }
    });
    showPhotographer(filterdPhotographer);
  });
};

const showAll = () => {
  fetchData().then(({ photographers }) => {
    showPhotographer(photographers);
  });
};

// SHOW ALL ON WINDOW Load
window.onload = () => {
  showAll();
};

//Show Photographer
const showPhotographer = (photographers) => {
  photographersContainer.innerHTML = "";
  photographers.map(
    ({ name, city, country, tagline, price, tags, portrait, id }) => {
      const photographerList = photographerCardMarkup(
        name,
        city,
        country,
        tagline,
        price,
        tags,
        portrait,
        id
      );
      photographersContainer.innerHTML += photographerList;
    }
  );
};

// FILTER FUNCTIONNALITY

//Event Listener
logo.addEventListener("click", (e) => {
  showAll();
  handleActive(e);
});

tags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    console.log(e);
    handleActive(e);
    // Get the tag name to filter
    const tagNameBrut = e.target.innerText;
    // process the innerText to delete the # and to lowercase the string to match what we have in the db
    const tagName = tagNameBrut.substr(1, tagNameBrut.length - 1).toLowerCase();
    showFilter(tagName);
  });
});
