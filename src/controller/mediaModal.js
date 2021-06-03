class mediaModal {
  constructor() {
    this.modal = document.querySelector(".lightbox");
    this.closeBtn = document.querySelector(".fa-times");
    this.modalImage = document.querySelector(".lightbox__content__img");
    this.modalName = document.querySelector(".lightbox__content__img");
  }

  show(media_id, medias) {
    console.log(medias);

    let idInt = parseInt(media_id);

    const selectedMedia = medias.find((media) => media.id === idInt);
    console.log(selectedMedia);

    this.modal.style.display = "flex";

    console.log(this.modalImage.children[0].src);

    this.modalImage.children[0].src = `../../public/assets/Images/${selectedMedia.photographerId}/${selectedMedia.image}`;
  }

  hide() {
    this.modal.style.display = "none";
  }
}

export default mediaModal;
