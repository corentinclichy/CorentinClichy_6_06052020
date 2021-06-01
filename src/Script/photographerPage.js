import fetchData from "../utils/fetchingData.js";
import Markup from "../Script/markup.js";
import ElementFactory from "./ElementFactory.js";

class PhotographerPage {
  constructor() {
    this.photographerBio = document.querySelector(".photographer-infos");
    this.photographerPriceInfos = document.querySelector(".photograher__price");
    this.showcaseContainer = document.querySelector(".showcase");
    this.fetchData = fetchData();
    this.elementFactory = new ElementFactory();
    this.totalLikes = 0;
  }

  _getId() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let idString = params.get("id");
    let id = parseInt(idString);
    return id;
  }

  fetchPhotographer() {
    const id = this._getId();
    fetchData().then(({ photographers, media }) => {
      // Photographer infos

      // medias of the photographers
      const filterMedia = media.filter((el) => el.photographerId === id);
      this._showMedias(filterMedia);

      // INFOS PRICE TOTAL LIKES OF THE PHOTOGRAPHER
      const filteredPhotographers = photographers.filter((el) => el.id === id);
      const photographer = filteredPhotographers[0];
      this._showPhotographer(photographer);
    });
  }

  _showPhotographer(photographer, media) {
    this.photographerBio.innerHTML = "";
    this.photographerPriceInfos.innerHTML = "";

    const bio = this.elementFactory.createPhotographerBio(
      photographer.name,
      photographer.city,
      photographer.country,
      photographer.tagline,
      photographer.tags,
      photographer.portrait
    );

    const price = this.elementFactory.createPriceInfos(
      photographer.price,
      this.totalLikes
    );

    this.photographerBio.innerHTML = bio;
    this.photographerPriceInfos.innerHTML = price;
  }

  _showMedias(medias) {
    this.showcaseContainer.innerHTML = "";

    medias.map(({ photographerId, image, video, likes, title }) => {
      let mediaList;
      if (!image) {
        mediaList = this.elementFactory.createMediaGallery(
          "video",
          photographerId,
          video,
          likes,
          title
        );

        this.totalLikes += likes;
      } else {
        mediaList = this.elementFactory.createMediaGallery(
          "image",
          photographerId,
          image,
          likes,
          title
        );
        this.totalLikes += likes;
      }

      this.showcaseContainer.innerHTML += mediaList;
    });
  }
}

const photographerPage = new PhotographerPage();

window.onload = () => {
  photographerPage.fetchPhotographer();
};
