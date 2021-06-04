import Markup from "./markup.js";

class ElementFactory {
  constructor() {
    this.createMediaGallery = function (
      type,
      photographer_id,
      image_url,
      likes,
      title,
      id
    ) {
      let media;
      let markup;

      if (type === "video") {
        media = new Markup();
        markup = media.mediaGalleryVideoMarkup(
          photographer_id,
          image_url,
          likes,
          title,
          id
        );
      } else if (type === "image") {
        media = new Markup();
        markup = media.mediaGalleryImageMarkup(
          photographer_id,
          image_url,
          likes,
          title,
          id
        );
      }

      return markup;
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

    this.createPriceInfos = function (price, likes) {
      let media = new Markup();
      let markup = media.priceInfosPhotographerMarkup(price, likes);
      return markup;
    };
  }
}

export default ElementFactory;
