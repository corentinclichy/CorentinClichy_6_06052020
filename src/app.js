import fetchData from "./modules/fetchingData.js";

const photographerCard = (
  name,
  city,
  country,
  tagline,
  price,
  tags,
  image_url
) => {
  return `
    <div class="cards-container__card-photographer">
        <a href="#" class="card-photographer__link">
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
            return `<div class="tag">
              <a href="#">#${tag}</a>
            </div>`;
          })
          .join("")}
        </div>
      </div>
`;
};

fetchData().then((data) => {
  const photographers = data.photographers;

  photographers.map(
    ({ name, city, country, tagline, price, tags, portrait }) => {
      console.log(tags);

      const photographerList = photographerCard(
        name,
        city,
        country,
        tagline,
        price,
        tags,
        portrait
      );

      console.log(photographerList);

      document.querySelector(".cards-container").innerHTML += photographerList;
    }
  );
});
