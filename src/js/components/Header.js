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
      document.querySelector('.button__auth').addEventListener('click', logout);
    } else if (!props.isLoggedIn) {
      const clone = headerLogout.cloneNode(true).content;
      containerHeader.appendChild(clone);
    }



  }

  logout() {

    localStorage.removeItem('token');
    header.clearHeader();
    header.render({ color: 'white', isLoggedIn: false, userName: '' });
    document.querySelector('.button__auth').addEventListener('click', openPopup);
  }



}