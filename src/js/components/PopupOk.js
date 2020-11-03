import Popup from './Popup';
import constants from '../constants/constants';
const { popupOk } = constants;

export default class PopupOk extends Popup {
  constructor() {
    super();
    this.handlers = [
      { element: document.querySelector('.popup__close'), event: 'click', callback: () => this.close() }

    ];
  }

  setOpenOkPopup () {
    this.clearContent();
    this.setContent(popupOk);

    this.handlers.push({
      element: document.querySelector('.popup__option'),
      event: 'click',
      callback: (e) => setOpenNewPopup(e),
    });

    this._setHandlers(this.handlers);
  }

}