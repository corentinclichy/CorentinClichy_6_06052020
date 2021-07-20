import Modal from './modal.js';
import FormValidator from './formValidator.js';

class ContactModal extends Modal {
  constructor() {
    super();
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
        this.modal.hideModal(this.modal.contactElement);
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
