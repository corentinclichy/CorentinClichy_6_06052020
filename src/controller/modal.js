class Modal {
  constructor() {
    this.lightboxElement = document.querySelector('.lightbox');
    this.contactElement = document.querySelector('.contact');
    this.mainContent = document.querySelector('.main-content');
    this.closeBtn = document.querySelectorAll('.close-btn');
    //select body elements
    this.body = document.querySelector('body');
  }

  showModal(modalElement) {
    this.body.style.overflow = 'hidden';

    this.body.style.top = `0px`;
    this.body.style.left = `0px`;
    modalElement.style.display = 'flex';
    this.lightboxElement.style.position = 'fixed';
    this.body.style.top = `-${window.scrollY}px`;
    modalElement.setAttribute('aria-hidden', 'false');
    this.mainContent.setAttribute('aria-hidden', 'true');
    modalElement.querySelector('#modalTitle') !== null &&
      modalElement.querySelector('#modalTitle').focus();
  }

  hideModal(modalElement) {
    this.body.style.overflow = 'auto';
    this.body.style.position = 'relative';
    this.body.style.top = ``;
    modalElement.style.display = 'none';
    modalElement.setAttribute('aria-hidden', 'true');
    this.mainContent.setAttribute('aria-hidden', 'false');
    // this.closeBtn.focus();
  }
}

export default Modal;
