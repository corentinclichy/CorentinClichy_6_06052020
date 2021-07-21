import fetchData from '../utils/fetchingData.js';
import ElementFactory from './ElementFactory.js';
import LightBoxModal from './lightboxModal.js';
import ContactModal from './contactModal.js';

class PhotographerPage {
  constructor() {
    this.photographerBio = document.querySelector('.photographer-infos');
    this.photographerPriceInfos = document.querySelector('.photograher__price');
    this.showcaseContainer = document.querySelector('.showcase');
    this.totalLikesNumber = document.querySelector('.total-likes__number');
    this.elementFactory = new ElementFactory();
    this.lightboxModal = new LightBoxModal();
    this.contactModal = new ContactModal();
    this.totalLikes = 0;
    this.ScrollToTopBtn = document.querySelector('#scroll-to-top');

    this.dropdownContent = document.querySelector('.dropdown-content');
    this.dropdown = document.querySelector('.dropdown');
    this.dropdownBtn = document.querySelector('.dropbtn');
    this.likeBtns = [];
    this.likes = [];

    //Lightbox Selectors
    this.closeBtns = document.querySelectorAll('.close-btn');
    this.previousMedia = document.querySelector('.previous-btn');
    this.nextMedia = document.querySelector('.next-btn');

    //ContactForm Selector
    this.contactBtns = document.querySelectorAll('.contact-btn');
    this.submitBtn = document.querySelector('input[type=submit]');

    //select filter-popular element
    this.filterActive = document.querySelector('#filter-active');
    this.filterDate = document.querySelector('#filter-date');
    this.filterTitle = document.querySelector('#filter-title');

    this.tag = this._getTag();
  }

  _getId() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let idString = params.get('id');
    let id = parseInt(idString);
    return id;
  }

  _getTag() {
    const url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let tag = params.get('tag');
    return tag;
  }

  fetchPhotographer(sortParam) {
    const id = this._getId();
    fetchData('../ressources/data.json').then(({ photographers, media }) => {
      // Photographer infos

      // medias of the photographers
      const filterMedia = media.filter((el) => el.photographerId === id);
      const sortmedias = this._sortMedia(filterMedia, sortParam);
      this._showMedias(sortmedias);

      // INFOS PRICE TOTAL LIKES OF THE PHOTOGRAPHER
      const filteredPhotographers = photographers.filter((el) => el.id === id);
      const photographer = filteredPhotographers[0];
      this._showPhotographer(photographer);
    });
  }

  _showPhotographer({ id, name, city, country, tagline, tags, portrait, price }) {
    this.photographerBio.innerHTML = '';
    this.photographerPriceInfos.innerHTML = '';

    const bio = this.elementFactory.createPhotographerBio({
      name: name,
      city: city,
      country: country,
      tagline: tagline,
      tags: tags,
      image_url: portrait,
      id: id,
    });

    const photographerPrice = this.elementFactory.createPriceInfos({
      price: price,
      totalLikes: this.totalLikes,
    });

    this.photographerBio.innerHTML = bio;
    this.photographerPriceInfos.innerHTML = photographerPrice;

    this.contactBtns = document.querySelectorAll('.contact-btn');

    this.contactBtns.forEach((contactBtn) => {
      contactBtn.addEventListener('click', () => {
        this.contactModal.showModal(this.contactModal.contactElement);
      });
    });

    this.showActive(this.tag);
  }

  _sortMedia(medias, sortParam) {
    switch (sortParam) {
      case 'Date':
        return medias.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        break;
      case 'Titre':
        return medias.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case 'Popularité':
        return medias.sort((a, b) => {
          return b.likes - a.likes;
        });
        break;
      default:
        return medias;
        break;
    }
  }

  _showMedias(medias) {
    this.showcaseContainer.innerHTML = '';
    this.lightboxModal.innerHTML = '';
    this.totalLikes = 0;

    if (this.tag === null) {
      medias.map(({ photographerId, image, video, likes, title, id, altText }) => {
        let mediaList;
        if (!image) {
          mediaList = this.elementFactory.createMediaGallery('video', {
            photographerId: photographerId,
            video_url: video,
            likes: likes,
            title: title,
            id: id,
            altText: altText,
          });

          this.totalLikes += likes;
        } else {
          mediaList = this.elementFactory.createMediaGallery('image', {
            photographerId: photographerId,
            image_url: image,
            likes: likes,
            title: title,
            id: id,
            altText: altText,
          });
          this.totalLikes += likes;
        }

        this.showcaseContainer.innerHTML += mediaList;
      });
    } else {
      let filteredmedias = medias.filter((media) => media.tags.includes(this.tag));

      filteredmedias.map(({ photographerId, image, video, likes, title, id, altText }) => {
        let mediaList;
        if (!image) {
          mediaList = this.elementFactory.createMediaGallery('video', {
            photographerId: photographerId,
            video_url: video,
            likes: likes,
            title: title,
            id: id,
            altText: altText,
          });

          this.totalLikes += likes;
        } else {
          mediaList = this.elementFactory.createMediaGallery('image', {
            photographerId: photographerId,
            image_url: image,
            likes: likes,
            title: title,
            id: id,
            altText: altText,
          });
          this.totalLikes += likes;
        }

        this.showcaseContainer.innerHTML += mediaList;
      });
    }

    // LIKE FEATURE
    this.likeBtns = document.querySelectorAll('.like__btn');
    this.likeBtns.forEach((el) => {
      el.addEventListener('click', () => {
        let totalNumberOfLikes = document.querySelector('.total-likes__number');

        let totalNumberOfLikesInt = parseInt(this.totalLikes);

        if (el.classList.contains('liked')) {
          let likesInt = parseInt(el.previousElementSibling.innerHTML);
          let updatedLikes = likesInt - 1;
          el.previousElementSibling.innerHTML = updatedLikes;
          totalNumberOfLikes.innerHTML = totalNumberOfLikesInt - 1;
        } else {
          let likesInt = parseInt(el.previousElementSibling.innerHTML);
          let updatedLikes = likesInt + 1;
          el.previousElementSibling.innerHTML = updatedLikes;
          totalNumberOfLikes.innerHTML = totalNumberOfLikesInt + 1;
        }
        // Toggle class liked on el if clicked
        if (el.classList.contains('liked')) {
          el.classList.remove('liked');
          el.innerHTML = '<i class="far fa-heart"></i>';
        } else {
          el.classList.add('liked');
          el.innerHTML = '<i class="fas fa-heart"></i>';
        }
      });
    });

    // OPEN MODAL FEATURE
    let allMedias = document.querySelectorAll('.photo-card__img');

    // open modal and display media
    allMedias.forEach((media) => {
      media.addEventListener('click', (e) => {
        const media_id = e.target.id;
        this.lightboxModal.showModal(this.lightboxModal.lightboxElement);
        this.lightboxModal.showMedia(media_id, medias);
      });
    });

    //show previous Media
    this.previousMedia.addEventListener('click', () => {
      this.lightboxModal.showPrevious(medias);
    });
    //show next Media
    this.nextMedia.addEventListener('click', () => {
      this.lightboxModal.showNext(medias);
    });

    document.addEventListener('keydown', (e) => {
      const keyCode = e.keycode ? e.keycode : e.which;

      if (
        this.lightboxModal.lightboxElement.getAttribute('aria-hidden') === ('false' || null) &&
        keyCode === 37
      ) {
        this.lightboxModal.showPrevious(medias);
      } else if (
        this.lightboxModal.lightboxElement.getAttribute('aria-hidden') === ('false' || null) &&
        keyCode === 39
      ) {
        this.lightboxModal.showNext(medias);
      }
    });
  }

  showFilterOptions() {
    // if classlist of dropDowncontent contains 'open' then close it
    this.dropdown.classList.toggle('open');
    this.dropdownContent.classList.toggle('hide');
    //ACCESSIBILITY
    if (this.dropdownContent.classList.contains('hide')) {
      this.dropdownBtn.setAttribute('aria-expanded', false);
    } else {
      this.dropdownBtn.setAttribute('aria-expanded', true);
    }
  }

  handleClickOnFilterOption(element) {
    element.addEventListener('click', (e) => {
      const fromVal = this.dropdownBtn.children[0].innerHTML;
      const toVal = e.target.innerHTML;

      this.dropdownBtn.children[0].innerHTML = toVal;
      e.target.innerHTML = fromVal;

      this.fetchPhotographer(this.dropdownBtn.children[0].innerHTML);

      this.dropdown.classList.remove('open');
      this.dropdownContent.classList.add('hide');
    });
  }
  showActive(tag) {
    //Select the element who have id tag
    let activeElement = document.getElementById(tag);

    //handle state active/unactive of the nav hashtag
    let tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      tag.classList.remove('active');
      tag.removeAttribute('aria-current');
    });
    activeElement && activeElement.classList.add('active');
    activeElement && activeElement.setAttribute('aria-current', 'page');
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

//Event Listener

const photographerPage = new PhotographerPage();

window.onload = () => {
  photographerPage.fetchPhotographer('Popularité');
  photographerPage.contactModal.validator.initialize();
};

photographerPage.dropdownBtn.addEventListener('click', () => {
  photographerPage.showFilterOptions();
});

photographerPage.dropdownContent.querySelectorAll('li').forEach((li) => {
  photographerPage.handleClickOnFilterOption(li);
});

photographerPage.closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    photographerPage.lightboxModal.hideModal(photographerPage.lightboxModal.lightboxElement);
    photographerPage.lightboxModal.hideModal(photographerPage.contactModal.contactElement);
  });
});

document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
  const keyCode = e.keycode ? e.keycode : e.which;

  if (
    ((photographerPage.lightboxModal.lightboxElement.getAttribute('aria-hidden') === 'false' ||
      null) &&
      keyCode === 27) ||
    ((photographerPage.contactModal.contactElement.getAttribute('aria-hidden') === 'false' ||
      null) &&
      keyCode === 27)
  ) {
    photographerPage.lightboxModal.hideModal(photographerPage.lightboxModal.lightboxElement);
    photographerPage.lightboxModal.hideModal(photographerPage.contactModal.contactElement);
  }
});

photographerPage.submitBtn.addEventListener('click', () => {
  photographerPage.contactModal.submitForm();
});

window.onscroll = function () {
  photographerPage.displayOnScroll();

  // add a eventlistner to the scroll to top button
  photographerPage.ScrollToTopBtn.addEventListener('click', photographerPage.scrollToTop);
};
