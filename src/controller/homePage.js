import fetchData from "../utils/fetchingData.js";
import ElementFactory from "./ElementFactory.js";

class HomePage {
  constructor() {
    this.tags = document.querySelectorAll(".tag");
    this.logo = document.querySelector(".header__logo");
    this.photographersContainer = document.querySelector(".cards-container");
    this.photographer = [];
    this.elementFactory = new ElementFactory();
  }

  _displayPhotographer(photographers) {
    this.photographersContainer.innerHTML = "";

    photographers.map(
      ({ name, city, country, tagline, price, tags, portrait, id }) => {
        const photographerList = this.elementFactory.createPhotographerList({
          name: name,
          city: city,
          country: country,
          tagline: tagline,
          price: price,
          tags: tags,
          image_url: portrait,
          id: id,
        });
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

const homePage = new HomePage();

window.onload = () => {
  homePage.showphotographer();
};

//EVENT LISTENER
///CLICK ON A TAG
homePage.tags.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    homePage.showFilter(e);
  });
});
