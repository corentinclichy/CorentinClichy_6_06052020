import fetchData from "./utils/modules/fetchingData.js";
import photographerCardMarkup from "./utils/modules/photographerCardMarkup.js";

class PhotographerList {
  constructor() {
    this.tags = document.querySelectorAll(".tag");
    this.logo = document.querySelector(".header__logo");
    this.photographersContainer = document.querySelector(".cards-container");
    this.photographer = [];
  }

  //Pseudo private Function
  // TODO: try to pass the method private
  _displayPhotographer(photographers) {
    this.photographersContainer.innerHTML = "";
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
        this.photographersContainer.innerHTML += photographerList;
      }
    );
  }

  showFilter(e) {
    const tag = e.target;

    //handle state active/unactive of the nav hashtag
    let tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      tag.classList.remove("active");
    });
    tag.classList.add("active");

    // Get the name of the tag and process it in order to match the db styling
    const tagNameBrut = e.target.innerText;

    const tagName = tagNameBrut.substr(1, tagNameBrut.length - 1).toLowerCase();

    //fetch data and map
    fetchData().then(({ photographers }) => {
      let filterdPhotographer = [];
      photographers.map((photographer) => {
        if (photographer.tags.includes(tagName)) {
          filterdPhotographer = [...filterdPhotographer, photographer];
        }
        this._displayPhotographer(filterdPhotographer);
      });
    });
  }

  showphotographer() {
    fetchData().then(({ photographers }) => {
      this._displayPhotographer(photographers);
    });
  }
}

const photographerList = new PhotographerList();

window.onload = () => {
  photographerList.showphotographer();
};

//EVENT LISTENER
///CLICK ON A TAG
photographerList.tags.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    photographerList.showFilter(e);
  });
});
