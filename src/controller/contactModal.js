import Modal from './modal.js';
import FormValidator from './formValidator.js';

class ContactModal extends Modal {
  constructor() {
    super();
    this.contactModal = document.querySelector('.contact__wrapper');
    this.contactForm = document.querySelector('.contact__form');
    this.formDatas = document.querySelectorAll('.form-data');
    this.submitBtn = document.querySelector('input[type=submit]');
    this.modal = new Modal();

    this.validator = new FormValidator(
      this.contactForm,
      ['first-name', 'last-name', 'email', 'message'],
      this.formDatas
    );
  }

  displayValidationMessage() {
    const validationScreen = `
      <div aria-label="Validation screen" class="validation-wrapper">
          <h1 tabindex="0" aria-label="Merci pour votre message, cliquer sur le bouton fermer ou echap pour revenir au site">Merci pour votre message</h1>
          <button role="button">Fermer</button>
      </div>
      <button class="close-btn" role="button" aria-label="Close button">
          <i class="fas fa-times"></i>
      </button>`;

    this.contactModal.innerHTML = validationScreen;

    this.contactModal.querySelector('h1').focus();

    this.contactModal.querySelector('.close-btn').addEventListener('click', () => {
      this.modal.hideModal(this.modal.contactElement);
    });
    this.contactModal.querySelector('button').addEventListener('click', () => {
      this.modal.hideModal(this.modal.contactElement);
    });
  }

  submitForm() {
    let firstNameField = document.querySelector('input[name=first-name]').value;
    let lastNameField = document.querySelector('input[name=last-name]').value;
    let emailField = document.querySelector('input[name=email]').value;
    let messageField = document.querySelector('textarea[name=message]').value;

    // Check if on or more are empty

    if (firstNameField || lastNameField || emailField || messageField !== '') {
      const error = this._isError(this.formDatas);
      if (!error) {
        firstNameField = document.querySelector('input[name=first-name]').value;
        lastNameField = document.querySelector('input[name=last-name]').value;
        emailField = document.querySelector('input[name=email]').value;
        messageField = document.querySelector('textarea[name=message]').value;
        console.log({
          firstName: firstNameField,
          lastName: lastNameField,
          email: emailField,
          message: messageField,
        });
        this.displayValidationMessage();
        // this.modal.hideModal(this.modal.contactElement);
      }
    }
  }

  _isError(fields) {
    // Get all the value of data-error-visible, check for error
    let error = [];
    fields.forEach((element) => {
      error = [...error, element.attributes[2].value];
    });
    if (error.includes('true')) {
      return true;
    }
    return false;
  }
}

export default ContactModal;
