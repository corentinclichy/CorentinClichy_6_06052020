class Markup {
  mediaGalleryVideoMarkup(photographer_id, image_url, likes, title, id) {
    return `
          <div class="showcase__photo-card">
          <figure class="photo-card__img" >
          <video
          preload="metadata"
          id=${id}>
          <source src="../../public/assets/Images/${photographer_id}/${image_url}#t=0.1" type="video/mp4">
        </video>
      
          </figure>
          <figcaption class="photo-card__infos">
            <p>${title}</p>
            <div class="like">
              <span>${likes}</span>
              <button class="like__btn">
               <i class="fas fa-heart"></i>
              </button>
            </div>
          </figcaption>
        </div>
              `;
  }

  mediaGalleryImageMarkup(photographer_id, image_url, likes, title, id) {
    return `
        <div class="showcase__photo-card">
        <figure class="photo-card__img" >
          <img
            src="../../public/assets/Images/${photographer_id}/${image_url}"
            alt=""
            id=${id}
          />
        </figure>
        <figcaption class="photo-card__infos">
          <p>${title}</p>
          <div class="like">
            <span class='like__numbers'>${likes}</span>
            <button class="like__btn">
               <i class="fas fa-heart"></i>
            </button>
          </div>
        </figcaption>
      </div>
            `;
  }

  lightBoxGalleryImageMarkup({ photographerId, image, id, title }) {
    return `
    <figure class="lightbox__content__img">
            <img
              src="../../public/assets/Images/${photographerId}/${image}"
              alt=""
              id=${id}
            />
    </figure>
    <figcaption class="img__infos">
            <p class="">${title}</p>
    </figcaption>

    `;
  }

  lightBoxGalleryVideoMarkup({ id, photographerId, title, video }) {
    return `
    <figure class="lightbox__content__img">
    <video
    preload="metadata"
    id=${id}
    controls>
    <source src="../../public/assets/Images/${photographerId}/${video}#t=0.1" type="video/mp4">
    </figure>
    <figcaption class="img__infos">
            <p class="">${title}</p>
    </figcaption>
    `;
  }

  photographerBioMarkup(photographer) {
    const { name, city, country, tagline, tags, image_url } = photographer;
    return `
        <div class="panel-left">
        <div class="wrap">
          <h1>${name}</h1>
          <button class="contact-btn contact-btn--desktop">
            Contactez-moi
          </button>
        </div>
    
        <p class="card-photographer__location">${city}, ${country}</p>
        <p class="card-photographer__description">
        ${tagline}
        </p>
    
        
        <div class="card-photographer__tags">
        ${tags
          .map((tag) => {
            return `
              <a class="tag" href="../index.html?tag=${tag}">#${tag}</a>
           `;
          })
          .join("")}
        </div>
      </div>
      <div class="right-panel">
        <a href="#" class="card-photographer__link">
          <figure class="card-photographer__img">
            <img
              src="../../../public/assets/Images/Photographers/${image_url}"
              alt=""
            />
          </figure>
        </a>
      </div>
        `;
  }

  photographerCardMarkup(photographer) {
    const { id, image_url, name, city, country, tagline, price, tags } =
      photographer;
    return `
          <div class="cards-container__card-photographer">
              <a href="pages/photographer.html?id=${id}" class="card-photographer__link">
                <figure class="card-photographer__img">
                  <img src="../public/assets/Images/Photographers/${image_url}" alt="" />
                </figure>
                <h2>${name}</h2>
              </a>
              <p class="card-photographer__location">${city}, ${country}</p>
              <p class="card-photographer__description">
                ${tagline}
              </p>
              <p class="card-photographer__price">${price}€/j</p>
              <div class="card-photographer__tags">
              ${tags
                .map((tag) => {
                  return `
                    <a class="tag" href="index.html?tag=${tag}">#${tag}</a>
                  `;
                })
                .join("")}
              </div>
            </div>
      `;
  }

  priceInfosPhotographerMarkup(price, likes) {
    return `
        <div class="photograher__price__total-likes">
          <span class="total-likes__number">${likes}</span>
          <i class="fas fa-heart"></i>
        </div>
        <p>${price}€/j</p>
          `;
  }
}

export default Markup;
