class Modal {
  constructor() {
    this.lightboxElement = document.querySelector(".lightbox");
    this.contactElement = document.querySelector(".contact");
  }
  showModal(modalElement) {
    modalElement.style.display = "flex";
  }

  hideModal(modalElement) {
    console.log();
    modalElement.style.display = "none";
  }
}

export default Modal;
