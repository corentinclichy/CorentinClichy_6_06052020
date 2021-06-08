import Modal from "./Modal.js";

class ContactModal extends Modal {
  constructor() {
    super();
    this.contactForm = document.querySelector(".contact__form");
    this.formDatas = document.querySelectorAll(".form-data");
    this.submitBtn = document.querySelector("input[type=submit]");

    this.validator = new FormValidator(
      this.contactForm,
      ["first-name", "last-name", "email", "message"],
      this.formDatas
    );
  }

  submitForm() {
    const firstNameField = document.querySelector(
      "input[name=first-name]"
    ).value;
    const lastNameField = document.querySelector("input[name=last-name]").value;
    const emailField = document.querySelector("input[name=email]").value;
    const messageField = document.querySelector("textarea[name=message]").value;

    //check if on or more are empty

    if (firstNameField || lastNameField || emailField || messageField !== "") {
      let error = this._isError(this.formDatas);
      if (!error) {
        const firstNameField = document.querySelector(
          "input[name=first-name]"
        ).value;
        const lastNameField = document.querySelector(
          "input[name=last-name]"
        ).value;
        const emailField = document.querySelector("input[name=email]").value;
        const messageField = document.querySelector(
          "textarea[name=message]"
        ).value;
        console.log({
          firstName: firstNameField,
          lastName: lastNameField,
          email: emailField,
          message: messageField,
        });
      }
    }
  }

  _isError(fields) {
    // get all the value of data-error-visible and check if there is one value true meaning that the form can't be validate
    let error = [];
    fields.forEach((element) => {
      error = [...error, element.attributes[2].value];
    });

    if (error.includes("true")) {
      return true;
    } else {
      return false;
    }
  }
}

//////////////////////////////////////////////////////////// FORM VALIDATOR

class FormValidator {
  constructor(form, fields, formDatas) {
    // Set property
    this.form = form;
    this.fields = fields;
    this.formDatas = formDatas;
    this.valide;
  }

  initialize() {
    // initialize the validator when app start
    this.setAttribute();
    this.validateOnSubmit();
    this.validateOnEntries();
  }

  setAttribute = () => {
    // add specific data-error-visible attribute to all the formDatas elements
    this.formDatas.forEach((element) => {
      element.setAttribute("data-error", "");
      element.setAttribute("data-error-visible", "false");
    });
  };

  validateOnEntries = () => {
    let self = this;
    //add validation features real-time when user typing for each fields
    this.fields.forEach((field) => {
      //select all the input inside the fields (formdata)
      const input = document.querySelectorAll(`[name="${field}"]`);

      //target the first item of the nodelist and listen for change on the input and pass the value to the validateFilds function
      input[0].addEventListener("input", (e) => {
        self.validateFields(input);
      });
    });
  };

  validateOnSubmit = () => {
    let self = this;
    // Validate all fields when pressing the submit button
    this.form.addEventListener("submit", (e) => {
      //avoid refresh
      e.preventDefault();

      this.fields.forEach((field) => {
        const input = document.querySelectorAll(`[name="${field}"]`);
        self.validateFields(input);
      });
    });
  };

  validateFields = (field) => {
    // Switch statement to test all the different possibilities
    const inputName = field[0].name;
    let inputValue = field[0].value;

    const formDataElement = field[0].parentElement;

    switch (inputName) {
      case "first-name":
        //(1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
        if (inputValue.trim().length < 2 || inputValue === null) {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;

      case "last-name":
        // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
        if (inputValue.trim().length < 2 || inputValue === null) {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;
      case "email":
        const re = /\S+@\S+\.\S+/;
        // (3) L'adresse électronique est valide.
        if (re.test(inputValue)) {
          formDataElement.setAttribute("data-error-visible", false);
        } else {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer un adresse email correct"
          );
          formDataElement.setAttribute("data-error-visible", true);
        }
        break;
      case "message":
        if (inputValue.trim().length < 4 || inputValue === null) {
          formDataElement.setAttribute(
            "data-error",
            "votre message doit comporter minimum 4 caractères"
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;
      default:
        console.log("error: no such field in this form");
        break;
    }
  };
}

export default ContactModal;
