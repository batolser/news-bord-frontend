if(window.matchMedia('(max-width: 375px)').matches) {
  window.onscroll = function() {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  document.querySelector('.header').style.backgroundColor= scrolled==0?"#ff000000":"rgba(255, 255, 255, 0.95)";
  // document.querySelector('.header').style.color= scrolled==0?"#1A1B22":"#1A1B22";
  // document.querySelector('.menu__button').style.backgroundImage= scrolled==0?"url(./images/menu_white.svg)":"url(./images/menu.svg)";

}
}
