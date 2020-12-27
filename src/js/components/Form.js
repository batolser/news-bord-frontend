import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor() {
    super();
    this.form = document.querySelector('.popup__form');
    this.inputs = [];

  }

validate(event) {
const input = event.target;
const errorMessage = input.closest('div').nextElementSibling;

if (input.validity.valueMissing) {
errorMessage.textContent = 'Заполните поле';
}
else if(input.name === 'email' && !input.checkValidity()) {
errorMessage.textContent = 'Введите email';
}
else if(input.name === 'password' && !input.checkValidity()) {
errorMessage.textContent = 'Введите пароль';
}
else if(input.name === 'name' && !input.checkValidity()) {
errorMessage.textContent = 'Введите имя';
}
else{

document.querySelector('.button__popup').removeAttribute('disabled');
document.querySelector('.button__popup').classList.add('button__popup_active');
}
// this.validateForm();
}

// validateForm() {
// const formInputs = Array.from(this.form.elements).every((element) => element.checkValidity());
// if (formInputs) {
// document.querySelector('.button__popup').removeAttribute('disabled');
// document.querySelector('.button__popup').classList.add('button__popup_active');

// }
// else {
// document.querySelector('.button__popup').setAttribute('disabled');
// }
// }

setValidateListners() {
this.inputs.forEach((input) => {
  input.addEventListener('input', this.validate);
});
}

  getInfo() {
    const formData = new FormData(this.form);
  const result = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  return result;
  }

  getInputs() {
    this.inputs = document.querySelectorAll('.popup__input');

    return this.inputs;
  };



}