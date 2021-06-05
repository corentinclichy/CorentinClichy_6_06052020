import Modal from "./Modal.js";

class ContactModal extends Modal {
  constructor() {
    super();
    this.contactForm = document.querySelector(".contact__form");
    this.formDatas = document.querySelectorAll(".form-data");
    this.validator = new FormValidator(
      this.contactForm,
      ["first-name", "last-name", "email", "message"],
      this.formDatas
    );
  }
}

//////////////////////////////////////////////////////////// FORM VALIDATOR

const formDatas = document.querySelectorAll(".formData");

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
    console.log("validator is initilized");
    console.log(this.form);
    console.log(this.fields);
    console.log(this.formDatas);
  }

  setAttribute = () => {
    // add specific data-error-visible attribute to all the formDatas elements
    formDatas.forEach((element) => {
      element.setAttribute("data-error-visible", "false");
    });
    console.log("setting attributes");
  };

  validateOnEntries = () => {
    //add validation features real-time when user typing for each fields
    this.fields.forEach((field) => {
      //select all the input inside the fields (formdata)
      const input = document.querySelectorAll(`[name="${field}"]`);

      //target the first item of the nodelist and listen for change on the input and pass the value to the validateFilds function
      input[0].addEventListener("input", (e) => {
        this.validateFields(input);
      });
    });
  };

  validateOnSubmit = () => {
    console.log(this.form);
    // Validate all fields when pressing the submit button
    this.form.addEventListener("submit", (e) => {
      //avoid refresh
      e.preventDefault();

      this.fields.forEach((field) => {
        const input = document.querySelectorAll(`[name="${field}"]`);
        this.validateFields(input);
      });
    });
  };

  validateFields = (field) => {
    // Switch statement to test all the different possibilities
    const inputName = field[0].name;
    let inputValue = field[0].value;

    const formDataElement = field[0].parentElement;

    switch (inputName) {
      case "first":
        //(1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
        if (inputValue.trim() < 2 || inputValue === null) {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;

      case "last":
        // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
        if (inputValue < 2 || inputValue === null) {
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
      case "birthdate":
        if (inputValue === "") {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer une date de naissance correcte"
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;
      case "quantity":
        // (4) Pour le nombre de concours, une valeur numérique est saisie.
        if (typeof parseInt(inputValue) != "number" || inputValue === "") {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez entrer nombre entre 0 et 99"
          );
          formDataElement.setAttribute("data-error-visible", true);
        } else {
          formDataElement.setAttribute("data-error-visible", false);
        }
        break;
      case "location":
        // Un bouton radio est sélectionné.
        let almostOneIsChecked = false;
        let checkedElemValue;

        field.forEach((elem) => {
          if (elem.checked) {
            almostOneIsChecked = true;
            checkedElemValue = elem.value;
          }
        });

        if (almostOneIsChecked) {
          formDataElement.setAttribute("data-error-visible", false);
        } else {
          formDataElement.setAttribute(
            "data-error",
            "Veuillez selectionner au moins une ville"
          );
          formDataElement.setAttribute("data-error-visible", true);
        }
        break;
      case "term":
        // (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
        if (field[0].checked) {
          formDataElement.setAttribute("data-error-visible", false);
        } else {
          formDataElement.setAttribute(
            "data-error",
            "Vous devez vérifier que vous acceptez les termes et conditions."
          );
          formDataElement.setAttribute("data-error-visible", true);
        }
        break;
      case "event":
        field.checked && console.log(field.checked);
        break;

      default:
        console.log("error: no such field in this form");
        break;
    }
  };
}

export default ContactModal;
