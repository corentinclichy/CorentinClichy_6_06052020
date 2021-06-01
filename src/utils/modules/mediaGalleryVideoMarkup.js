const mediaGalleryVideoMarkup = (photographer_id, image_url, likes, title) => {
  return `
    <div class="showcase__photo-card">
    <figure class="photo-card__img">
    <video width="320" height="240" controls="controls" preload="metadata">
    <source src="../../public/assets/Images/${photographer_id}/${image_url}#t=0.1" type="video/mp4">
  </video>

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

export default mediaGalleryVideoMarkup;
