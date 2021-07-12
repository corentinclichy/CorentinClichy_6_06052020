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
    modalElement.style.display = 'flex';
    modalElement.setAttribute('aria-hidden', 'false');
    this.mainContent.setAttribute('aria-hidden', 'true');
  }

  hideModal(modalElement) {
    this.body.style.overflow = 'auto';
    modalElement.style.display = 'none';
    modalElement.setAttribute('aria-hidden', 'true');
    this.mainContent.setAttribute('aria-hidden', 'false');
    this.closeBtn.focus();
  }
}

export default Modal;
