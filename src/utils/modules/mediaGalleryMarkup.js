const mediaGalleryMarkup = (price, likes) => {
  return `
    <div class="showcase__photo-card">
    <figure class="photo-card__img">
      <img
        src="../../public/assets/Images/Mimi/Event_PintoWedding.jpg"
        alt=""
      />
    </figure>
    <figcaption class="photo-card__infos">
      <p>Arc en ciel</p>
      <div class="like">
        <span>12</span>
        <i class="fas fa-heart"></i>
      </div>
    </figcaption>
  </div>
        `;
};

export default priceInfosPhotographerMarkup;
