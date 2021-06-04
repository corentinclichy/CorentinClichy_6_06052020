import ElementFactory from "./ElementFactory.js";

class mediaModal {
  constructor() {
    this.modal = document.querySelector(".lightbox");
    this.closeBtn = document.querySelector(".fa-times");
    this.modalImage = document.querySelector(".lightbox__content__img");
    this.modalName = document.querySelector(".lightbox__content__img");
    this.lightBoxContent = document.querySelector(".lightbox__content");
    this.elementFactory = new ElementFactory();
  }

  show(media_id, medias) {
    let idInt = parseInt(media_id);

    const selectedMedia = medias.find((media) => media.id === idInt);

    const { id, photographerId, video, image, title } = selectedMedia;

    this.modal.style.display = "flex";

    this.lightBoxContent.innerHTML = "";

    let lightBoxMedia;

    if (!image) {
      lightBoxMedia = this.elementFactory.createlightboxMedia("video", {
        id: id,
        title: title,
        image: image,
        video: video,
        photographerId: photographerId,
      });
    } else {
      lightBoxMedia = this.elementFactory.createlightboxMedia("image", {
        id: id,
        title: title,
        image: image,
        video: video,
        photographerId: photographerId,
      });
    }

    this.lightBoxContent.innerHTML = lightBoxMedia;
  }

  showPrevious(media_id, medias) {
    console.log(media_id, medias);
  }

  showNext() {}

  hide() {
    this.modal.style.display = "none";
  }
}

export default mediaModal;
