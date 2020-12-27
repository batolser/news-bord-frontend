import BaseComponent from './BaseComponent';
import constants from '../constants/constants';
const { containerHeader, headerLoginWhite, headerLoginBlack, headerLogout } = constants;
import utilits from '../utilits/utilits';
const { logout, openPopup } = utilits;

export default class Header extends BaseComponent{
  constructor() {
    super();
  }

  clearHeader() {
    const headerLogo = containerHeader.querySelector('.header__logo');
    const headerNav = containerHeader.querySelector('.nav');

    if (headerLogo) containerHeader.removeChild(headerLogo);
    if (headerNav) containerHeader.removeChild(headerNav);
  }

  render(props) {
    if (props.isLoggedIn) {
      this.clearHeader();
      const template = props.color === 'white'
        ? headerLoginWhite
        : headerLoginBlack;
      const clone = template.cloneNode(true).content;
      const name = clone.querySelector('.nav__login');
      name.textContent = props.userName;
      containerHeader.appendChild(clone);

      this._setHandlers([{
        element: document.querySelector('.button__auth'),
        event: 'click',
        callback: (event) => this.logout(event),
      }]);

    } else if (!props.isLoggedIn) {
      const clone = headerLogout.cloneNode(true).content;
      containerHeader.appendChild(clone);
    }



  }

  logout() {

    localStorage.removeItem('token');
    this.clearHeader();
    this.render({ color: 'white', isLoggedIn: false, userName: '' });
    window.location.href = 'index.html';
    setTimeout(function(){document.location.href = "index.html";},500);
    document.querySelector('.button__auth').addEventListener('click', openPopup);
  }



}