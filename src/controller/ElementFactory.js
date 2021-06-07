import Markup from "./markup.js";

class ElementFactory {
  constructor() {
    this.createMediaGallery = function (type, media) {
      console.log(media);
      let markup;
      let video;
      let image;

      if (type === "video") {
        markup = new Markup();
        video = markup.mediaGalleryVideoMarkup(media);
        return video;
      } else if (type === "image") {
        markup = new Markup();
        image = markup.mediaGalleryImageMarkup(media);
        return image;
      }
    };

    this.createlightboxMedia = function (type, media) {
      let markup;
      let video;
      let image;

      if (type === "video") {
        markup = new Markup();
        video = markup.lightBoxGalleryVideoMarkup(media);
        return video;
      } else if (type === "image") {
        markup = new Markup();
        image = markup.lightBoxGalleryImageMarkup(media);
        return image;
      }
    };

    this.createPhotographerList = function (photographer) {
      let media = new Markup();
      let markup = media.photographerCardMarkup(photographer);

      return markup;
    };
    this.createPhotographerBio = function (photographer) {
      let media = new Markup();
      let markup = media.photographerBioMarkup(photographer);
      return markup;
    };

    this.createPriceInfos = function (obj) {
      let markup = new Markup();
      let priceInfoMarkup = markup.priceInfosPhotographerMarkup(obj);
      return priceInfoMarkup;
    };
  }
}

export default ElementFactory;
