import ElementFactory from './ElementFactory.js';
import Modal from './modal.js';

class LightBoxModal extends Modal {
  constructor() {
    super();
    this.modal = document.querySelector('.lightbox');
    this.closeBtn = document.querySelector('.fa-times');
    this.modalImage = document.querySelector('.lightbox__content__img');
    this.modalName = document.querySelector('.lightbox__content__img');
    this.lightBoxContent = document.querySelector('.lightbox__content');
    this.elementFactory = new ElementFactory();
  }

  _displayMedia(type, { id, photographerId, video, image, title }) {
    this.lightBoxContent.innerHTML = '';
    let lightBoxMedia;

    if (!type) {
      lightBoxMedia = this.elementFactory.createlightboxMedia('video', {
        id: id,
        title: title,
        image: image,
        video: video,
        photographerId: photographerId,
      });
    } else {
      lightBoxMedia = this.elementFactory.createlightboxMedia('image', {
        id: id,
        title: title,
        image: image,
        video: video,
        photographerId: photographerId,
      });
    }

    this.lightBoxContent.innerHTML = lightBoxMedia;
  }

  showMedia(media_id, medias) {
    let idInt = parseInt(media_id);

    const selectedMedia = medias.find((media) => media.id === idInt);

    const { id, photographerId, video, image, title } = selectedMedia;

    // this.modal.style.display = "flex";

    this._displayMedia(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }

  showPrevious(medias) {
    const currentMediaId = parseInt(document.querySelector('.lightbox__content__img').id);

    const currentMediaIndex = medias.findIndex((obj) => obj.id == currentMediaId);

    //get the previous index
    let previousMediaIndex;
    if (currentMediaIndex === 0) {
      // if index = 0 => display the last media
      previousMediaIndex = medias.length - 1;
    } else {
      // if index > 0 => display the currentmedia -1
      previousMediaIndex = currentMediaIndex - 1;
    }

    const previousMedia = medias[previousMediaIndex];
    const { id, photographerId, video, image, title } = previousMedia;

    this._displayMedia(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }

  showNext(medias) {
    const currentMediaId = parseInt(document.querySelector('.lightbox__content__img').id);

    const currentMediaIndex = medias.findIndex((obj) => obj.id == currentMediaId);

    //get the previous index
    let nextMediaIndex;
    if (currentMediaIndex === medias.length - 1) {
      // if index = 0 => display the last media
      nextMediaIndex = 0;
    } else {
      // if index > 0 => display the currentmedia -1
      nextMediaIndex = currentMediaIndex + 1;
    }

    const nextMedia = medias[nextMediaIndex];
    const { id, photographerId, video, image, title } = nextMedia;

    this._displayMedia(image, {
      id,
      photographerId,
      video,
      image,
      title,
    });
  }
}

export default LightBoxModal;
