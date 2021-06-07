class Modal {
  constructor() {
    this.lightboxElement = document.querySelector(".lightbox");
    this.contactElement = document.querySelector(".contact");
    this.mainContent = document.querySelector(".main-content");
    this.closeBtn = document.querySelectorAll(".close-btn");
  }

  showModal(modalElement) {
    modalElement.style.display = "flex";
    modalElement.setAttribute("aria-hidden", "false");
    this.mainContent.setAttribute("aria-hidden", "true");
    this.closeBtn.focus();
  }

  hideModal(modalElement) {
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    this.mainContent.setAttribute("aria-hidden", "false");
    this.closeBtn.focus();
  }
}

export default Modal;
