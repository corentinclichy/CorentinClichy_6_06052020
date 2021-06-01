import fetchData from "../utils/modules/fetchingData.js";
import photographerBioMarkup from "../utils/modules/photographerBioMarkup.js";
import priceInfosPhotographerMarkup from "../utils/modules/PriceInfosPhotographerMarkup.js";
import mediaGalleryMarkup from "../utils/modules/mediaGalleryMarkup.js";
import mediaGalleryVideoMarkup from "../utils/modules/mediaGalleryVideoMarkup.js";

class PhotographerPage {
  constructor() {
    this.photographerBio = document.querySelector(".photographer-infos");
    this.photographerPriceInfos = document.querySelector(".photograher__price");
    this.showcaseContainer = document.querySelector(".showcase");
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
      const filteredPhotographers = photographers.filter((el) => el.id === id);
      const photographer = filteredPhotographers[0];
      this._showPhotographer(photographer);

      // medias of the photographers
      const filterMedia = media.filter((el) => el.photographerId === id);
      this._showMedias(filterMedia);
    });
  }

  _showPhotographer(photographer) {
    this.photographerBio.innerHTML = "";
    this.photographerPriceInfos.innerHTML = "";

    const bio = photographerBioMarkup(
      photographer.name,
      photographer.city,
      photographer.country,
      photographer.tagline,
      photographer.tags,
      photographer.portrait
    );

    const price = priceInfosPhotographerMarkup(photographer.price);

    this.photographerBio.innerHTML = bio;
    this.photographerPriceInfos.innerHTML = price;
  }

  _showMedias(medias) {
    this.showcaseContainer.innerHTML = "";

    medias.map(({ photographerId, image, video, likes, title }) => {
      let mediaList;
      console.log(video);
      if (!image) {
        mediaList = mediaGalleryVideoMarkup(
          photographerId,
          video,
          likes,
          title
        );
      } else {
        mediaList = mediaGalleryMarkup(photographerId, image, likes, title);
      }

      this.showcaseContainer.innerHTML += mediaList;
    });
  }

  _mediafactory;
}

const photographerPage = new PhotographerPage();

window.onload = () => {
  photographerPage.fetchPhotographer();
};
