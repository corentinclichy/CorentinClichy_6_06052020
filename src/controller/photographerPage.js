import fetchData from "../utils/fetchingData.js";
import ElementFactory from "./ElementFactory.js";
import mediaModal from "./mediaModal.js";

class PhotographerPage {
  constructor() {
    this.photographerBio = document.querySelector(".photographer-infos");
    this.photographerPriceInfos = document.querySelector(".photograher__price");
    this.showcaseContainer = document.querySelector(".showcase");
    this.totalLikesNumber = document.querySelector(".total-likes__number");
    this.fetchData = fetchData();
    this.elementFactory = new ElementFactory();
    this.totalLikes = 0;

    this.dropdownContent = document.querySelector(".dropdown-content");
    this.dropdown = document.querySelector(".dropdown");
    this.dropdownBtn = document.querySelector(".dropbtn");
    this.likeBtns = [];
    this.likes = [];

    //Lightbox Selectors
    this.closeBtn = document.querySelector(".close-btn");
    this.previousMedia = document.querySelector(".previous-btn");
    this.nextMedia = document.querySelector(".next-btn");
  }

  _getId() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let idString = params.get("id");
    let id = parseInt(idString);
    return id;
  }

  _getTag() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let tag = params.get("tag");
    return tag;
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

  _showPhotographer({ name, city, country, tagline, tags, portrait, price }) {
    this.photographerBio.innerHTML = "";
    this.photographerPriceInfos.innerHTML = "";

    const bio = this.elementFactory.createPhotographerBio({
      name: name,
      city: city,
      country: country,
      tagline: tagline,
      tags: tags,
      image_url: portrait,
    });

    const photographerPrice = this.elementFactory.createPriceInfos(
      price,
      this.totalLikes
    );

    this.photographerBio.innerHTML = bio;
    this.photographerPriceInfos.innerHTML = photographerPrice;
  }

  _showMedias(medias) {
    this.showcaseContainer.innerHTML = "";

    medias.map(({ photographerId, image, video, likes, title, id }) => {
      let mediaList;
      if (!image) {
        mediaList = this.elementFactory.createMediaGallery(
          "video",
          photographerId,
          video,
          likes,
          title,
          id
        );

        this.totalLikes += likes;
      } else {
        mediaList = this.elementFactory.createMediaGallery(
          "image",
          photographerId,
          image,
          likes,
          title,
          id
        );
        this.totalLikes += likes;
      }

      this.showcaseContainer.innerHTML += mediaList;
    });

    // LIKE FEATURE
    this.likeBtns = document.querySelectorAll(".like__btn");
    this.likeBtns.forEach((el) => {
      el.addEventListener("click", () => {
        let totalNumberOfLikes = document.querySelector(".total-likes__number");

        let totalNumberOfLikesInt = parseInt(totalNumberOfLikes.innerHTML);

        if (el.classList.contains("liked")) {
          let likesInt = parseInt(el.previousElementSibling.innerHTML);
          let updatedLikes = likesInt - 1;
          el.previousElementSibling.innerHTML = updatedLikes;
          totalNumberOfLikes.innerHTML = totalNumberOfLikesInt - 1;
        } else {
          let likesInt = parseInt(el.previousElementSibling.innerHTML);
          let updatedLikes = likesInt + 1;
          el.previousElementSibling.innerHTML = updatedLikes;
          totalNumberOfLikes.innerHTML = totalNumberOfLikesInt + 1;
        }
        el.classList.toggle("liked");
      });
    });

    // OPEN MODAL FEATURE
    const lightboxModal = new mediaModal();

    let allMedias = document.querySelectorAll(".photo-card__img");

    // open modal
    allMedias.forEach((media) => {
      media.addEventListener("click", (e) => {
        const media_id = e.target.id;

        lightboxModal.show(media_id, medias);
      });
    });

    this.previousMedia;

    // close modal
    this.closeBtn.addEventListener("click", (e) => {
      lightboxModal.hide();
    });
  }

  showFilter() {
    this.dropdownContent.classList.toggle("hide");
    this.dropdown.classList.toggle("open");
  }
}

const photographerPage = new PhotographerPage();

window.onload = async () => {
  photographerPage.fetchPhotographer();
};

photographerPage.dropdownBtn.addEventListener("click", () => {
  photographerPage.showFilter();
});

window.addEventListener("DOMContentLoaded", () => {});
