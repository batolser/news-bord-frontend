// import '../styles/style.css';


const mainPopup = document.querySelector('.popup');
// const closePopup = document.querySelector('.popup__close');
const popupContent = document.querySelector('.popup__content');
const popupSignin = document.querySelector('#popup-signin');
const popupSignup = document.querySelector('#popup-signup');
const buttonAuth = document.querySelector('.button__auth');
const popupOption = document.querySelector('.popup__option');


class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _setHandlers = (handlers) => {
    handlers.forEach((handler) => {
      this._setAddEventListener(handler);
    });
  }

  _setAddEventListener = ({ element, event, callback }) => {
    element.addEventListener(event, callback);
    this._listeners.push({ element, event, callback });
  }

  removeListeners = () => {
    this._listeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
  }
}

class Popup extends BaseComponent {
  constructor(popup, content, template) {
    super();
    this.popup = popup;
    this.content = content;
    this.template = template;
    this.closePop = this.popup.closePop;
    this.handlers = [
      { element: document, event: 'openPopup', callback: (e) => this.openPopup(e) }
    ];
  }

  setContent() {
    this.content.appendChild(this.template.cloneNode(true).content);
  }

  clearContent() {
    const popupTitle = this.content.querySelector('.popup__title');
    const popupForm = this.content.querySelector('.popup__form');
    const popupOption = this.content.querySelector('.popup__option');

    if (popupTitle) this.content.removeChild(this.content.querySelector('.popup__title'));
    if (popupForm) this.content.removeChild(this.content.querySelector('.popup__form'));
    if (popupOption) this.content.removeChild(this.content.querySelector('.popup__option'));
  }

  open() {
    this.popup.classList.toggle('popup_is-opened');
    this.setContent();
    }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.clearContent();
    }

  setOpenNewPopup = (event) => {
      if (event.target.id === 'toSignUp') {
        SignUpPopup.open.bind(SignUpPopup);
      }
    }

  openPopup = () => {
    this.setContent();

    const popupOption = this.content.querySelector('.popup__option');

    this.handlers.push({
      element: popupOption,
      event: 'click',
      callback: (e) => this.setOpenNewPopup(e),
    });

    this._setHandlers(this.handlers);
  }

  setEventListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

}
// class PopupWithForm extends Popup {
//   constructor(popup, content, template) {
//     super(popup, content, template)
//   }

//   setOpenNewPopup(event) {

//   if (event.target.closest('#popup-signin').querySelector('.popup__option')) {
//     SignUpPopup.open.bind(SignUpPopup);
//   }
//   if (event.target.closest('#popup-signup')) {
//     SignInPopup.open.bind(SignInPopup);
//   }


//     }
//   }

const SignInPopup = new Popup(mainPopup, popupContent, popupSignin);
const SignUpPopup = new Popup(mainPopup, popupContent, popupSignup);

SignInPopup.setEventListeners();
SignUpPopup.setEventListeners();

buttonAuth.addEventListener('click', SignInPopup.open.bind(SignInPopup));

// popupSignin.addEventListener('click', (event) => {
//   if (event.target.matches('.popup__close')) {
//     SignInPopup.close.bind(SignInPopup);
//   }
// })
// class openNewPop {
//   constructor(button) {
//     this.button = button;
//   }

//   events(event) {
//     if (event.target.classList.closest('#popup-signin')) {
//       SignUpPopup.open.bind(SignUpPopup);
//     }
//     if (event.target.classList.closest('#popup-signup')) {
//       SignInPopup.open.bind(SignInPopup);
//     }
//  }
//  setEventListeners() {
//   this.buttonAuth.addEventListener('click', this.events.bind(this));
// }
// }

// const open = new openNewPop(popupOption);
// open.setEventListeners();



// popupOption.addEventListener('click', (event) => {
//   if (event.target.closest('#popup-signin')) {
//     SignUpPopup.open.bind(SignUpPopup);
//   }
//   if (event.target.closest('#popup-signup')) {
//     SignInPopup.open.bind(SignInPopup);
//   }
// });


// popupSignin.querySelector('.popup__option').addEventListener('click', SignUpPopup.open.bind(SignUpPopup));
// SignInPopup.setEventListeners();
// popupOption.addEventListener('click', SignUpPopup.open.bind(SignUpPopup));




class dateCard extends BaseComponent {
  cardsDate = (date) => {
    const standardDate = new Date(Date.parse(date));
    const day = standardDate.getDate();
    const month = months[standardDate.getMonth()];
    const year = standardDate.getFullYear();
    return `${day} ${month}, ${year}`;
  };
}

const cardsList = document.querySelector('.cards-list');

class NewsCard extends dateCard {
  constructor(data, keyword) {
    super();
    this.data = data;
    this.data.keyword = keyword;
  }

  createCard = (data) => {
    const card = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardTop = document.createElement('div');
    const cardTagContener = document.createElement('div');
    const cardTag = document.createElement('p');
    const cardBookmark = document.createElement('p');
    const cardDescription = document.createElement('div');
    const cardFix = document.createElement('div');
    const cardDate = document.createElement('p');
    const cardTitle = document.createElement('h4');
    const cardText = document.createElement('p');
    const cardSource = document.createElement('p');

    card.classList.add('card');
    cardImage.classList.add('card__img');
    cardTop.classList.add('card__top');
    cardTagContener.classList.add('card__tag', 'card__tag_disactive');
    cardTag.classList.add('card__tag', 'card__tag_content');
    cardBookmark.classList.add('card__icon', 'card__icon_bookmarkg');
    cardDescription.classList.add('card__description');
    cardFix.classList.add('card__fix');
    cardDate.classList.add('card__date');
    cardTitle.classList.add('card__title');
    cardText.classList.add('card__text');
    cardSource.classList.add('card__source');


    cardDate.textContent = this.cardsDate(data.publishedAt);
    cardTitle.textContent = data.title;
    cardText.textContent = data.description;
    cardSource.href = data.url;
    cardSource.textContent = data.source.name;
    cardImage.src = data.imageUrl;

    card.appendChild(cardImage);
    card.appendChild(cardTop);
    card.appendChild(cardDescription);
    cardTop.appendChild(cardTagContener);
    cardTop.appendChild(cardBookmark);
    cardTagContener.appendChild(cardTag);
    cardDescription.appendChild(cardFix);
    cardDescription.appendChild(cardSource);
    cardFix.appendChild(cardDate);
    cardFix.appendChild(cardTitle);
    cardFix.appendChild(cardText);

    return card;
  }
}

const API_KEY = '9b730c26c4c34bcf9df75180873381d6';
searchForm = document.querySelector('.search');
searchInput = document.querySelector('.search__field');

class NewsApi {
  constructor(options) {
    Object.assign(this, options);
    this.url = `https://newsapi.org/v2/everything?q=${this.keyword}&from=${this.dateFrom}&to=${this.dateTo}&pageSize=3&sortBy=popularity&apiKey=${API_KEY}`;
  }

  getNews = (skip) => fetch(`${this.url}&page=${skip}`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Ошибка');
    })
    .catch((err) => {
      throw new Error(err.message);
    })
}

const submitSearch = async (event) => {
  event.preventDefault();
  const newsApi = new NewsApi({
    keyword: searchInput.value,
    // dateFrom: ,
    // dateTo: ,
  });


}

searchForm.addEventListener('submit', (event) => submitSearch(event));