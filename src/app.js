import fetchData from "./modules/fetchingData.js";
import photographerCardMarkup from "./modules/photographerCardMarkup.js";

//Selectors:
const tags = document.querySelectorAll(".tag");
const photographersContainer = document.querySelector(".cards-container");

//Show Photographer
const showPhotographer = (photographers) => {
  photographersContainer.innerHTML = "";
  photographers.map(
    ({ name, city, country, tagline, price, tags, portrait }) => {
      const photographerList = photographerCardMarkup(
        name,
        city,
        country,
        tagline,
        price,
        tags,
        portrait
      );
      photographersContainer.innerHTML += photographerList;
    }
  );
};

// SHOW ALL
window.onload = fetchData().then(({ photographers }) => {
  showPhotographer(photographers);
});

// FILTER FUNCTIONNALITY

//Event Listener
tags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    handleActive(e);
    // Get the tag name to filter
    const tagNameBrut = e.target.innerText;
    // process the innerText to delete the # and to lowercase the string to match what we have in the db
    const tagName = tagNameBrut.substr(1, tagNameBrut.length - 1).toLowerCase();
    showFilter(tagName);
  });
});

const handleActive = (e) => {
  tags.forEach((tag) => {
    tag.classList.remove("active");
  });
  e.target.classList.add("active");
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
