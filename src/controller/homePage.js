import fetchData from '../utils/fetchingData.js';
import ElementFactory from './ElementFactory.js';

class HomePage {
  constructor() {
    this.tags = document.querySelectorAll('.tag');
    this.logo = document.querySelector('.header__logo');
    this.photographersContainer = document.querySelector('.cards-container');
    this.photographer = [];
    this.elementFactory = new ElementFactory();

    this.ScrollToTopBtn = document.querySelector('#scroll-to-top');
  }

  _getTag() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let tag = params.get('tag');

    return tag;
  }

  _displayPhotographer(photographers) {
    this.photographersContainer.innerHTML = '';

    photographers.map(({ name, city, country, tagline, price, tags, portrait, id, altText }) => {
      const photographerList = this.elementFactory.createPhotographerList({
        name: name,
        city: city,
        country: country,
        tagline: tagline,
        price: price,
        tags: tags,
        image_url: portrait,
        id: id,
        altText: altText,
      });
      this.photographersContainer.innerHTML += photographerList;
    });

    this.tags = document.querySelectorAll('.tag');

    this.tags.forEach((tag) => {
      tag.addEventListener('click', function (e) {
        console.log(e.target);
        // this.showFilter(e);
      });
    });
  }

  showActive(tag) {
    let selectedTag = document.querySelector(`#${tag}`);
    //handle state active/unactive of the nav hashtag
    let tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      tag.classList.remove('active');
      tag.removeAttribute('aria-current');
    });
    selectedTag && selectedTag.classList.add('active');
    selectedTag && selectedTag.setAttribute('aria-current', 'page');
  }

  showphotographer() {
    let tag = this._getTag();

    if (tag === null) {
      fetchData('../src/ressources/data.json').then(({ photographers }) => {
        this._displayPhotographer(photographers);
      });
    } else {
      fetchData('../src/ressources/data.json').then(({ photographers }) => {
        let filterdPhotographer = [];

        photographers.map((photographer) => {
          if (photographer.tags.includes(tag)) {
            filterdPhotographer = [...filterdPhotographer, photographer];
          }
          this._displayPhotographer(filterdPhotographer);
        });
      });
    }

    this.showActive(tag);
  }

  displayOnScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 40) {
      this.ScrollToTopBtn.style.display = 'block';
    } else {
      this.ScrollToTopBtn.style.display = 'none';
    }
  }

  // create a function to scroll to the top of the page
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}

const homePage = new HomePage();

window.onload = () => {
  homePage.showphotographer();
};

window.onscroll = function () {
  homePage.displayOnScroll();

  // add a eventlistner to the scroll to top button
  homePage.ScrollToTopBtn.addEventListener('click', homePage.scrollToTop);
};
