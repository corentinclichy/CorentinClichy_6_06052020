import Markup from './markup.js';

class ElementFactory {
  constructor() {
    this.createMediaGallery = (type, media) => {
      let markup;
      let video;
      let image;

      if (type === 'video') {
        markup = new Markup();
        video = markup.mediaGalleryVideoMarkup(media);
        return video;
      }
      if (type === 'image') {
        markup = new Markup();
        image = markup.mediaGalleryImageMarkup(media);
        return image;
      }
      return console.log('error');
    };

    this.createlightboxMedia = (type, media) => {
      let markup;
      let video;
      let image;

      if (type === 'video') {
        markup = new Markup();
        video = markup.lightBoxGalleryVideoMarkup(media);
        return video;
      }
      if (type === 'image') {
        markup = new Markup();
        image = markup.lightBoxGalleryImageMarkup(media);
        return image;
      }
      return console.log('error');
    };

    this.createPhotographerList = (photographer) => {
      const media = new Markup();
      const markup = media.photographerCardMarkup(photographer);

      return markup;
    };
    this.createPhotographerBio = (photographer) => {
      const media = new Markup();
      const markup = media.photographerBioMarkup(photographer);
      return markup;
    };

    this.createPriceInfos = (obj) => {
      const markup = new Markup();
      const priceInfoMarkup = markup.priceInfosPhotographerMarkup(obj);
      return priceInfoMarkup;
    };
  }
}

export default ElementFactory;
