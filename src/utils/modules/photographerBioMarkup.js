const photographerBioMarkup = (
  name,
  city,
  country,
  tagline,
  tags,
  image_url
) => {
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
        return `<div class="tag">
          <a href="#">#${tag}</a>
        </div>`;
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
};

export default photographerBioMarkup;
