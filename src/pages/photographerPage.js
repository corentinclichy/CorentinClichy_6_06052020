import fetchData from "../utils/modules/fetchingData.js";
import photographerBioMarkup from "../utils/modules/photographerBioMarkup.js";
import priceInfosPhotographerMarkup from "../utils/modules/PriceInfosPhotographerMarkup.js";

//SELECTORS

const photographerBio = document.querySelector(".photographer-infos");
const photographerPriceInfos = document.querySelector(".photograher__price");

///Function

const getId = () => {
  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let idString = params.get("id");
  let id = parseInt(idString);
  return id;
};

const fetchPhotographer = (id) => {
  fetchData().then(({ photographers, media }) => {
    console.log(photographers);
    // Photographer infos
    const filteredPhotographers = photographers.filter((el) => el.id === id);
    const photographer = filteredPhotographers[0];
    showPhotographer(photographer);

    // medias of the photographers
    const filterMedia = media.filter((el) => el.photographerId === id);
    console.log(filterMedia);
  });
};

const showPhotographer = (photographer) => {
  photographerBio.innerHTML = "";
  photographerPriceInfos.innerHTML = "";

  const bio = photographerBioMarkup(
    photographer.name,
    photographer.city,
    photographer.country,
    photographer.tagline,
    photographer.tags,
    photographer.portrait
  );

  const price = priceInfosPhotographerMarkup(photographer.price);

  photographerBio.innerHTML = bio;
  photographerPriceInfos.innerHTML = price;
};

window.onload = () => {
  const id = getId();
  fetchPhotographer(id);
};
