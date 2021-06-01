const mediaGalleryMarkup = (photographer_id, image_url, likes, title) => {
  return `
    <div class="showcase__photo-card">
    <figure class="photo-card__img">
      <img
        src="../../public/assets/Images/${photographer_id}/${image_url}"
        alt=""
      />
    </figure>
    <figcaption class="photo-card__infos">
      <p>${title}</p>
      <div class="like">
        <span>${likes}</span>
        <i class="fas fa-heart"></i>
      </div>
    </figcaption>
  </div>
        `;
};

export default mediaGalleryMarkup;


/// 1 class markup a