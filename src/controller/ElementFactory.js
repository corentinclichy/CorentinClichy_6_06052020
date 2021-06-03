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
    this.createPhotographerList = function (photographer) {
      let media = new Markup();
      let markup = media.photographerCardMarkup(photographer);

      return markup;
    };
    this.createPhotographerBio = function (
      name,
      city,
      country,
      tagline,
      tags,
      image_url
    ) {
      let media = new Markup();
      let markup = media.photographerBioMarkup(
        name,
        city,
        country,
        tagline,
        tags,
        image_url
      );
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
