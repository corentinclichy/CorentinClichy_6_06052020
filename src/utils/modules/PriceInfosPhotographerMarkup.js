const priceInfosPhotographerMarkup = (price, likes) => {
  return `
    <div class="photograher__price">
    <div class="photograher__price__total-likes">
      <span>${likes}</span>
      <i class="fas fa-heart"></i>
    </div>
    <p>${price}€/j</p>
  </div>
      `;
};

export default priceInfosPhotographerMarkup;
