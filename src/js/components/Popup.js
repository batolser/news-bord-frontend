import BaseComponent from './BaseComponent';
import constants from '../constants/constants';
const { mainPopup, popupContent, popupSignin, popupSignup, popupOk } = constants;



import FormSignIn from './FormSignIn';
const signInForm = new FormSignIn(mainApi, header);
import MainApi from '../api/MainApi';
const mainApi = new MainApi ();
import Header from './Header';
const header = new Header({ color: 'white' });

export default class Popup extends BaseComponent {
  constructor(signUpForm, signInForm) {
    super();

    this.signUpForm = signUpForm;
    this.signInForm = signInForm;
    this.handlers = [
      { element: document.querySelector('.popup__close'), event: 'click', callback: () => this.close() }

    ];
  }

  setContent(template) {

    popupContent.appendChild(template.cloneNode(true).content);

    this.handlers.push({
      element: document.querySelector('.popup__option'),
      event: 'click',
      callback: (e) => this.setOpenNewPopup(e),
    });


    this._setHandlers(this.handlers);
  }

  clearContent() {
    const popupTitle = popupContent.querySelector('.popup__title');
    const popupForm = popupContent.querySelector('.popup__form');
    const popupOption = popupContent.querySelector('.popup__option');

    if (popupTitle) popupContent.removeChild(popupContent.querySelector('.popup__title'));
    if (popupForm) popupContent.removeChild(popupContent.querySelector('.popup__form'));
    if (popupOption) popupContent.removeChild(popupContent.querySelector('.popup__option'));
  }

  open() {
    mainPopup.classList.toggle('popup_is-opened');

    }

  close() {
    mainPopup.classList.remove('popup_is-opened');
    this.clearContent();
    }

  setOpenNewPopup (e) {
      if (e.target.id === 'toSignUp') {
        this.clearContent();
        this.removeListeners();
        this.setContent(popupSignup);
        this.signUpForm.init();
      } else if (e.target.id === 'toSignIn') {
        this.clearContent();
        this.removeListeners();
        this.setContent(popupSignin);
        this.signInForm.init();
    }
    else if (e.target.id === 'goToSignIn') {
      this.clearContent();
      this.removeListeners();
      this.setContent(popupSignin);
      signInForm.init();
  }

  }

  setOpenOkPopup () {
    this.clearContent();
    this.removeListeners();
    this.setContent(popupOk);

    this.handlers.push({
      element: document.querySelector('.popup__option'),
      event: 'click',
      callback: (e) => setOpenNewPopup(e),
    });

    this._setHandlers(this.handlers);
  }


}