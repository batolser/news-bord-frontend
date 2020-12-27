export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _setHandlers (handlers) {
    handlers.forEach((handler) => {
      this._setAddEventListener(handler);
    });
  }

  _setAddEventListener ({ element, event, callback }) {
    element.addEventListener(event, callback);
    this._listeners.push({ element, event, callback });
  }

  removeListeners () {
    this._listeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }
}