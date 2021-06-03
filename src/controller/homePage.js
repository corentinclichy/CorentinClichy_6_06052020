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

  _getTag() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let tag = params.get("tag");

    return tag;
  }

  _displayPhotographer(photographers, callback) {
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

    this.tags = document.querySelectorAll(".tag");

    this.tags.forEach((tag) => {
      tag.addEventListener("click", function (e) {
        console.log(e.target);
        // this.showFilter(e);
      });
    });
  }

  showActive(tag) {
    let selectedTag = document.querySelector(`#${tag}`);
    //handle state active/unactive of the nav hashtag
    let tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      tag.classList.remove("active");
    });
    selectedTag && selectedTag.classList.add("active");
  }

  showphotographer() {
    let tag = this._getTag();

    if (tag === null) {
      fetchData().then(({ photographers }) => {
        this._displayPhotographer(photographers);
      });
    } else {
      fetchData().then(({ photographers }) => {
        let filterdPhotographer = [];
        photographers.map((photographer) => {
          if (photographer.tags.includes(tag)) {
            filterdPhotographer = [...filterdPhotographer, photographer];
          }
          this._displayPhotographer(filterdPhotographer);
        });
      });
    }

    this.showActive(tag);
  }
}

const homePage = new HomePage();

window.onload = () => {
  homePage.showphotographer();
};
