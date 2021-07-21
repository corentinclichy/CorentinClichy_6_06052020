class Markup {
  mediaGalleryVideoMarkup({ photographerId, video_url, likes, title, id, altText }) {
    return `
    <article class="showcase__photo-card" role="group" aria-label="${altText} video">
      <figure class="photo-card__img" role='link' aria-label="Afficher la video">
        <video
        preload="metadata"
        id=${id}
        alt="${altText}">
          <source src="../../public/assets/Images/${photographerId}/${video_url}#t=0.1" type="video/mp4">
        </video>
      </figure>
      <figcaption class="photo-card__infos" aria-label="information sur la video">
        <p aria-label="Titre de la video" role="text">${title}</p>
        <div class="like" role='group' aria-label="likes">
          <span class='like__numbers'>${likes}</span>
          <button class="like__btn" role="button" aria-label="click pour liker la vidéo">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </figcaption>
    </article>
              `;
  }

  mediaGalleryImageMarkup({ photographerId, image_url, likes, title, id, altText }) {
    return `
      <article class="showcase__photo-card" role="group" aria-label="${altText},image">
        <figure class="photo-card__img" role="link" aria-label="afficher l'image" >
          <img
            src="../../public/assets/Images/${photographerId}/${image_url}"
            alt="${altText}"
            id=${id}
          />
        </figure>
        <figcaption class="photo-card__infos" aria-label="information sur la photo">
          <p aria-label="Titre de la photo" role="text">${title}</p>
          <div class="like" role='group' aria-label="Nombre de likes">
            <span class='like__numbers'>${likes}</span>
            <button role="button" aria-label="Click pour liker la photo" class="like__btn">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </figcaption>
      </article>
            `;
  }

  lightBoxGalleryImageMarkup({ photographerId, image, id, title }) {
    return `
    <figure tabindex="0" id="media" class="lightbox__content__img" id=${id} aria-label="Photographie ${title}, naviguer avec les flèches, echap pour fermer la fenêtre">
            <img
              class="lightbox__content__image"
              src="../../public/assets/Images/${photographerId}/${image}"
              alt="Photographie ${title}"
              id=${id}
            />
    </figure>
    <figcaption class="img__infos">
      <p class="" tabindex="0">${title}</p>
    </figcaption>


    `;
  }

  lightBoxGalleryVideoMarkup({ id, photographerId, title, video }) {
    return `
    <figure class="lightbox__content__img" id=${id}>
    <video
    preload="metadata"
    id=${id}
    class="lightbox__content__image"
    controls>
    <source src="../../public/assets/Images/${photographerId}/${video}#t=0.1" type="video/mp4">
    <figcaption class="img__infos">
            <p class="" tabindex="0">${title}</p>
    </figcaption>
    </figure>
    `;
  }

  photographerBioMarkup({ id, name, city, country, tagline, tags, image_url }) {
    return `
        <div class="panel-left">
        <div class="wrap">
          <h1>${name}</h1>
          <button class="contact-btn contact-btn--desktop modal-btn">
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
              <a class="tag" id="${tag}"href="../pages/photographer.html?tag=${tag}&id=${id}"><span class="sr-only">Tag</span>#${tag}</a>
           `;
          })
          .join('')}
          <a class="tag" id="null" href="../pages/photographer.html?id=${id}"><span class="sr-only">Tag</span>#Tous</a>
        </div>
      </div>
      <div class="right-panel">
          <figure class="card-photographer__img" role='img' aria-label="Image du photographer ${name}">
            <img
              src="../../public/assets/Images/Photographers/${image_url}"
              alt=""
            />
          </figure>
      </div>
        `;
  }

  photographerCardMarkup({ id, image_url, name, city, country, tagline, price, tags, altText }) {
    return `
      <artile class="cards-container__card-photographer" aria-label='photographe ${name}'>
          <a href="pages/photographer.html?id=${id}&sort=popularity" class="card-photographer__link">
            <figure class="card-photographer__img" role='img' aria-label='Image et nom du ${altText}'>
              <img src="../public/assets/Images/Photographers/${image_url}" alt="${altText}" />
            </figure>
            <h2>${name}</h2>
          </a>
          <p class="card-photographer__location">${city}, ${country}</p>
          <p class="card-photographer__description">
            ${tagline}
          </p>
          <p role="text" class="card-photographer__price" aria-label="${price} euros par jour">${price}€/j</p>
          <div class="card-photographer__tags" role="navigation" aria-label="Liste des tags associé à ce photographe">
          ${tags
            .map((tag) => {
              return `
                <a class="tag" href="index.html?tag=${tag}"><span class="sr-only">Tag</span>#${tag} </a>
              `;
            })
            .join('')}
          </div>
        </artile>
      `;
  }

  priceInfosPhotographerMarkup({ price, totalLikes }) {
    return `
        <div class="photograher__price__total-likes" role="text" aria-label="${totalLikes}likes">
          <span  class="total-likes__number">${totalLikes}</span>
          <i aria-label="likes" class="fas fa-heart"></i>
        </div>
        <p role='text' aria-label="${price}euros par jour">${price}€/j</p>
          `;
  }
}

export default Markup;
