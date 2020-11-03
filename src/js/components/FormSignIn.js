import Form from './Form';
import constants from '../constants/constants';
const { mainPopup } = constants;


export default class FormSignIn extends Form {
  constructor(api, header) {
    super();
    this.api = api;
    this.header = header;

  }

  signIn(event) {
    event.preventDefault();
    this.api.signin(this.getInfo())
        .then((res) => {
          this.api.isLoggedIn = true;
          this.header.render({ color: 'white' , isLoggedIn: true, userName: res.name });
          localStorage.setItem('token', res.token);
          mainPopup.classList.remove('popup_is-opened');
        })
        .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
      };

  init() {
    this.getInputs();
    this.form = document.querySelector('.popup__form');
    this.setValidateListners();
    this._setHandlers([{
      element: document.querySelector('.button__popup'),
      event: 'click',
      callback: (event) => this.signIn(event),
    }]);
  }

}