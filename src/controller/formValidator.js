class FormValidator {
  constructor(form, fields, formDatas) {
    // Set property
    this.form = form;
    this.fields = fields;
    this.formDatas = formDatas;
  }

  initialize() {
    // initialize the validator when app start
    this.setAttribute();
    this.validateOnEntries();
    this.validateOnSubmit();
  }

  setAttribute() {
    // add specific data-error-visible attribute to all the formDatas elements
    this.formDatas.forEach((element) => {
      element.setAttribute('data-error', '');
      element.setAttribute('data-error-visible', 'false');
    });
  }

  validateOnEntries() {
    // Add validation features real-time when user typing for each fields
    this.fields.forEach((field) => {
      // Select all the input inside the fields (formdata)
      const input = document.querySelectorAll(`[name="${field}"]`);

      // Target the first item of the nodelist and pass the value to the validateFilds function
      input[0].addEventListener('input', () => {
        this.validateFields(input);
      });
    });
  }

  validateOnSubmit() {
    const self = this;
    // Validate all fields when pressing the submit button
    this.form.addEventListener('submit', (e) => {
      // Avoid refresh
      e.preventDefault();

      this.fields.forEach((field) => {
        const input = document.querySelectorAll(`[name="${field}"]`);
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    // Switch statement to test all the different possibilities
    const inputName = field[0].name;
    const inputValue = field[0].value;

    const formDataElement = field[0].parentElement;
    const res = /\S+@\S+\.\S+/;

    switch (inputName) {
      case 'first-name':
        // (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
        if (inputValue.trim().length < 2 || inputValue === null) {
          formDataElement.setAttribute(
            'data-error',
            'Veuillez entrer 2 caractères ou plus pour le champ du prénom.'
          );
          formDataElement.setAttribute('data-error-visible', true);
        } else {
          formDataElement.setAttribute('data-error-visible', false);
        }
        break;

      case 'last-name':
        // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
        if (inputValue.trim().length < 2 || inputValue === null) {
          formDataElement.setAttribute(
            'data-error',
            'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
          );
          formDataElement.setAttribute('data-error-visible', true);
        } else {
          formDataElement.setAttribute('data-error-visible', false);
        }
        break;
      case 'email':
        // (3) L'adresse électronique est valide.
        if (res.test(inputValue)) {
          formDataElement.setAttribute('data-error-visible', false);
        } else {
          formDataElement.setAttribute('data-error', 'Veuillez entrer un adresse email correct');
          formDataElement.setAttribute('data-error-visible', true);
        }
        break;
      case 'message':
        if (inputValue.trim().length < 4 || inputValue === null) {
          formDataElement.setAttribute(
            'data-error',
            'votre message doit comporter minimum 4 caractères'
          );
          formDataElement.setAttribute('data-error-visible', true);
        } else {
          formDataElement.setAttribute('data-error-visible', false);
        }
        break;
      default:
        return {
          error: 'error: no such field in this form',
        };
    }
    return '';
  }
}

export default FormValidator;
