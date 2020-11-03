import Form from './Form';
import PopupOk from './PopupOk';

const openPopupOk = new PopupOk();

export default class FormSignUp extends Form {
  constructor(api) {
    super();
    this.api = api;


  }

  signUp(event) {
    event.preventDefault();
    this.api.signup(this.getInfo())
      .then((res) => {
        if (res.status === 409) {
          document.querySelector('.popup__input_error_inique').textContent = 'Пользователь с такими данными уже существует';
          return Promise.reject(res.message);
        }
        if (res.status === 200) {
          openPopupOk.setOpenOkPopup();
        }
      })

      .catch(
        (err) => Promise.reject(err)

        )
  }

  init() {
    this.getInputs();
    this.form = document.querySelector('.popup__form');
    this.setValidateListners();
    this._setHandlers([{
      element: document.querySelector('.button__popup'),
      event: 'click',
      callback: (event) => this.signUp(event),
    }
  ]);
  }


}