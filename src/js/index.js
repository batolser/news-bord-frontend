import '../styles/style.css';


const mainPopup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupSignin = document.querySelector('#popup-signin');
const popupSignup = document.querySelector('#popup-signup');
const popupOk = document.querySelector('#popup-ok');
// const buttonAuth = document.querySelector('.button__auth');
const buttonClosePopup = document.querySelector('.popup__close');
// const popupOption = document.querySelector('.popup__option');


const RESULTS_CONTAINER = document.querySelector('.results');
const NEWSCARDS_CONTAINER = document.querySelector('.loading__cards');
const CARDS_LIST = document.querySelector('.cards-list');
const SHOWMORE_BUTTON = document.querySelector('.button__more');
const SEARCH_FORM = document.querySelector('.search');
const SEARCH_BUTTON = document.querySelector('.search__field');
// const FORM = document.querySelector('.popup__form')
const UP_FORM = document.forms.signup;
const MONTHS = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
  'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
];

  function cardDate(dateObj) {
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${day} ${MONTHS[month]}, ${year}`;
  }

  function apiDate(dateObj) {
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (1 + dateObj.getMonth()).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function nthDaysAgoFromDate(dateObj, days) {
    const daysMs = 1000 * 60 * 60 * 24 * days;
    const sevenDaysObj = new Date(Date.parse(dateObj) - daysMs);
    return apiDate(sevenDaysObj);
  }

  const DATE_FORMATTERS = {
    cardDate, apiDate, nthDaysAgoFromDate,
  };


class BaseComponent {
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



//основной функционал

class NewsApi {
  constructor() {
    this._deployURL = 'https://praktikum.tk/news/v2/everything';
    this._localhostURL = 'https://newsapi.org/v2/everything';
    this._apiKey = '9b730c26c4c34bcf9df75180873381d6';
    this._pageSize = 100;
  }

  getNews(keyword, from, to) {
    return fetch(`${this._localhostURL}?q=${encodeURI(keyword)}&apiKey=${this._apiKey}&language=ru&from=${from}&to=${to}&pageSize=${this._pageSize}`,

    {method: 'GET'})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Код ошибки: ${res.statusCode}, Сообщение: ${res.statusText}`));
      })
      .then((res) => {
        if (res.totalResults > 0) {
          return res;
        }
        return Promise.reject('По запросу ничего найдено');
      })
      .catch((err) => Promise.reject(err));

  }


}

const newsApi = new NewsApi();


class MainApi {
  constructor() {
    this._mainURL = 'http://api.news-bord.students.nomoreparties.co';
    this.isLoggedIn = false;
  }

  signup({email, password, name}) {
    return fetch(`${this._mainURL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
    }


  signin({email, password}) {
    return fetch(`${this._mainURL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((res) => {
      if (res.status !== 200) {
        throw (err => {
          console.log(err);
        })
      }
      return res.json();
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));

    }

  getUserData() {
    return fetch(`${this._mainURL}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        throw (err => {
          console.log(err);
        })
      }
      return res.json();
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
  }


  // getArticles() {
  //   return this.makeFetch(`articles`);
  // }

  createArticle(article) {
    return fetch(`${this._mainURL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        // keyword: article.keyword,
        keyword: article.keyword,
        link: article.link,
        image: article.image,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
      }),
    })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
  }

  removeArticle(articleId) {
    return fetch(`${this._mainURL}/articles`+articleId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
}

getArticles() {
  return fetch(`${this._mainURL}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
}

}

const mainApi = new MainApi ();

class NewsCard {
  // constructor(cardData) {
  //   this.cardData = cardData;
  // }

  createCard (cardData, keyWord) {
    const card = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardKeyword = document.createElement('p');
    const cardTop = document.createElement('div');
    const cardTagContainer = document.createElement('div');
    const cardTag = document.createElement('p');
    const cardBookmark = document.createElement('div');
    const cardDescription = document.createElement('div');
    const cardFix = document.createElement('div');
    const cardDate = document.createElement('p');
    const cardTitle = document.createElement('h4');
    const cardText = document.createElement('p');
    const cardSource = document.createElement('p');

    card.classList.add('card');
    cardImage.classList.add('card__img');
    cardKeyword.classList.add('card__keyword');
    cardTop.classList.add('card__top');
    cardTagContainer.classList.add('card__tag', 'card__tag_container', 'card__tag_disactive');
    cardTag.classList.add('card__tag', 'card__tag_content');
    cardBookmark.classList.add('card__icon', 'card__icon_bookmark');
    cardDescription.classList.add('card__description');
    cardFix.classList.add('card__fix');
    cardDate.classList.add('card__date');
    cardTitle.classList.add('card__title');
    cardText.classList.add('card__text');
    cardSource.classList.add('card__source');


    //узнать 'target', '_blank'
    card.setAttribute('href', cardData.url);
    card.setAttribute('target', '_blank');
    cardImage.setAttribute('src', cardData.urlToImage);
    cardImage.setAttribute('alt', 'Картинка');
    cardKeyword.textContent = cardData.keyword || keyWord;
    cardTag.textContent = 'Войдите, чтобы сохранять статьи';
    this._date = cardData.publishedAt;
    cardDate.textContent = (this._date);
    cardTitle.textContent = cardData.title;
    cardText.textContent = cardData.description;
    cardSource.textContent = cardData.source.name;
    // if (this._type === 'default') date.textContent = DATE_FORMATTERS.cardDate(new Date(Date.parse(articleDate)));
    // else date.textContent = articleDate;




    card.appendChild(cardImage);
    card.appendChild(cardKeyword);
    card.appendChild(cardTop);
    card.appendChild(cardDescription);
    cardTop.appendChild(cardTagContainer);
    cardTop.appendChild(cardBookmark);
    cardTagContainer.appendChild(cardTag);
    cardDescription.appendChild(cardFix);
    cardDescription.appendChild(cardSource);
    cardFix.appendChild(cardDate);
    cardFix.appendChild(cardTitle);
    cardFix.appendChild(cardText);

    return card;
  }

  // addArticles(event, cardData) {
  //   event.stopPropagation();
  //   const {
  //     keyword, title, text, date, source, link, image
  //   } = cardData;

  //  MainApi.createArticle({
  //     keyword: keyword,
  //     title: title,
  //     text: description,
  //     date: publishedAt,
  //     source: source.name,
  //     link: url,
  //     image: urlToImage,
  //   })
  //     .then((res) => {
  //       this.data._id = res._id;

  //     })
  //     .catch((err) => err.message);
  // }
}



class NewsCardList extends BaseComponent {
  constructor(resultsContainer, articlesContainer, cardList,
    showMoreButton, newsCard, api) {
super();
    this._articlesContainer = articlesContainer;
    this._resultsContainer = resultsContainer;
    this._showMoreButton = showMoreButton;
    this._allFoundedArticles = [];
    this._cardList = cardList;
    this.chunk = 3;
    this.newsCard = newsCard;
    this.api = api;
    // this.handlers = [
    //   { element: document.querySelector('.card__icon_bookmark'), event: 'click', callback: () => addArticles() }
    // ];

  }

  setArticlesArray(articles, keyWord) {
    this.keyWord = keyWord;
    this._allFoundedArticles = articles;
  }

  addCard(newsCard, keyWord) {
    const element = this.newsCard.createCard(newsCard, keyWord);
    this._cardList.appendChild(element);
  }

  renderResults() {
      this._resultsContainer.classList.remove('results_disactive');
      this._articlesContainer.classList.remove('loading_disactive');
      if (this._allFoundedArticles.length > this.chunk) {
        for (let i = 0; i < this.chunk; i++) {
          this.addCard(this._allFoundedArticles[0], this.keyWord);
          this._allFoundedArticles.shift();
        }
      }
      this._setHandlers([{
        element: this._cardList,
        event: 'click',
        callback: (event) => this.toggleMark(event),
      }]);
    }

  _showMore() {
    this.renderResults();
    if (this._allFoundedArticles.length < 3) {
      this._showMoreButton.classList.add('button__hide');
      for (let i = 0; i < this.chunk; i++) {
        this.addCard(this._allFoundedArticles[0]);
        this._allFoundedArticles.shift();
      }
    }
  }

  clearCardList() {

    const CardListArray = document.querySelectorAll('.card');
    CardListArray.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  }

  setEventListener() {
    this._showMoreButton.addEventListener('click', this._showMore.bind(this));

  }



  toggleMark(event) {

    if (event.target.classList.contains('card__icon_bookmark')) {
      if(this.api.isLoggedIn){
        event.preventDefault();
        const cardArticle = event.target.closest('.card');
        const article = [];
        article.keyword = cardArticle.querySelector('.card__keyword').textContent;
        article.link = cardArticle.href;
        article.image = cardArticle.querySelector('.card__img').src;
        article.title = cardArticle.querySelector('.card__title').textContent;
        article.text = cardArticle.querySelector('.card__text').textContent;
        article.date = cardArticle.querySelector('.card__date').textContent;
        article.source = cardArticle.querySelector('.card__source').textContent;

        // event.preventDefault();
        this.api.createArticle(article)
        .then((res) => {

          cardArticle.setAttribute('data-id', res.data._id);
          cardArticle.querySelector('.card__icon_bookmark').classList.add('card__icon_ok');


        })
        .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
      }
      else if(!this.api.isLoggedIn) {
        event.preventDefault();
        event.target.previousSibling.classList.remove('card__tag_disactive');
      }
      }
      if(event.target.classList.contains('card__icon_trash')) {
        event.preventDefault();
      const articleId = event.target.closest('.card').dataset.id;
      this.api.removeArticle(articleId);
      event.target.closest('.card').querySelector('.card__icon').classList.add('card__icon_ok');
      //перерисовать выведенные карточки
      }
    }
  }

  // needReg(event) {
  //   event.preventDefault();
  //     event.target.previousSibling.classList.remove('card__tag_disactive');

  // }

  // addArticles(event, data) {
  //   event.stopPropagation();
  //   const {
  //     keyword, title, text, date, source, link, image
  //   } = data;

  //   this.api.createArticle({
  //     keyword: keyword,
  //     title: title,
  //     text: description,
  //     date: publishedAt,
  //     source: source.name,
  //     link: url,
  //     image: urlToImage,
  //   })
  //     .then((res) => {
  //       this.data._id = res._id;

  //     })
  //     .catch((err) => err.message);
  // }



const containerHeader = document.querySelector('.container__header');
const headerLoginWhite = document.querySelector('#header-login_white');
const headerLoginBlack = document.querySelector('#header-login_black');
const headerLogout = document.querySelector('#header-logout');

class Header extends BaseComponent{
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
    // this.checkToken();
    if (props.isLoggedIn) {
      this.clearHeader();
      const template = props.color === 'white'
        ? headerLoginWhite
        : headerLoginBlack;
      const clone = template.cloneNode(true).content;
      const name = clone.querySelector('.nav__login');
      name.textContent = props.userName;
      // document.querySelector('.saved__title_login').textContent = props.userName;
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


  // checkToken() {
  //   localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  // }
}


const header = new Header({ color: 'white' });

const newsCard = new NewsCard();
const newsCardList = new NewsCardList(RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST,
  SHOWMORE_BUTTON, newsCard, mainApi);
  newsCardList.setEventListener();








  class Form extends BaseComponent {
    constructor() {
      super();
      this.form = document.querySelector('.popup__form');
      this.inputs = [];

    }

  // getValue() {

  // return this.form.children[0].value;

  //   }

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
  // button.classList.remove('popup__button_disabled');

  document.querySelector('.button__popup').removeAttribute('disabled');
}
// this.validateForm();
}

validateForm() {
  const formInputs = Array.from(this.form.elements).every((element) => element.checkValidity());
if (formInputs) {
  document.querySelector('.button__popup').removeAttribute('disabled');
}
else {
  document.querySelector('.button__popup').setAttribute('disabled');
}
}

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





  class FormSignUp extends Form {
    constructor(api) {
      super();
      this.api = api;


    }

    signUp(event) {
      event.preventDefault();
      this.api.signup(this.getInfo())
        .then(() => {
          openPopupOk.setOpenOkPopup();
        })
        .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
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




  class FormSignIn extends Form {
    constructor(api) {
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

  const signUpForm = new FormSignUp(mainApi);
  const signInForm = new FormSignIn(mainApi, header);

  // const searchForm = new Form(SEARCH_FORM);
  class Popup extends BaseComponent {
    constructor(signUpForm, signInForm) {
      super();
      // this.popup = popup;
      // this.content = content;
      // this.closePop = this.popup.closePop;
      this.signUpForm = signUpForm;
      this.signInForm = signInForm;
      this.handlers = [
        { element: document.querySelector('.popup__close'), event: 'click', callback: () => this.close() }
        // { element: document.querySelector('.button__auth'), event: 'click', callback: () => this.open() }
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
      // this.setContent();
      }

    close() {
      mainPopup.classList.remove('popup_is-opened');
      this.clearContent();
      }

    setOpenNewPopup (e) {
        if (e.target.id === 'toSignUp') {
          this.clearContent();
          this.setContent(popupSignup);
          // this.signInForm.removeListeners();
          this.signUpForm.init();
        } else if (e.target.id === 'toSignIn') {
          this.clearContent();
          this.setContent(popupSignin);
          // this.signUpForm.removeListeners();
          signInForm.init();
      }

    }


  }

  const popup = new Popup(signUpForm, signInForm);

  class PopupOk extends Popup {
    constructor() {
      super();
      this.handlers = [
        { element: document.querySelector('.popup__close'), event: 'click', callback: () => this.close() }
        // { element: document.querySelector('.button__auth'), event: 'click', callback: () => this.open() }
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

  const openPopupOk = new PopupOk();

  const searchFormSubmit = async (event) => {
    event.preventDefault();
    newsCardList.clearCardList();

    document.querySelector('.results').classList.remove('results_disactive');
    document.querySelector('.loading').classList.remove('loading_disactive');

    const keyWord = SEARCH_FORM.children[0].value;

      newsApi.getNews(keyWord)
        .then((res) => {
          if (res.articles.length !== 0) {
            document.querySelector('.results').classList.add('results_disactive');
    document.querySelector('.loading').classList.add('loading_disactive');
            newsCardList.setArticlesArray(res.articles, keyWord);
            newsCardList.renderResults();

          }
          else if ((res.articles.length === 0)) {
            document.querySelector('.results').classList.remove('results_disactive');
    document.querySelector('.loading__nothing').classList.remove('loading_disactive');

          }
        })
        .catch((err) => {

          document.querySelector('.loading').classList.add('loading_disactive');
    document.querySelector('.loading__nothing').classList.remove('loading_disactive');

        console.error(`Произошла ошибка: "${err.message}"`)
        })


        SEARCH_FORM.children[0].value = '';


  };




  SEARCH_FORM.addEventListener('submit', searchFormSubmit);

  //добавить .nav__item.nav__item_login:nth-of-type(1) {
  //   margin-right: 34px;
  // } для прозрачной темы
// class Validate extends Form {
// constructor()
// }
const openPopup = async () => {
  popup.setContent(popupSignin);

  popup.open();
  signInForm.init();
}


  const logout = async () => {
      header.logout();
    }


  const initPage = async () => {


    await mainApi.getUserData()
    .then((res) => {
      // localStorage.setItem('token', res.token);
      mainApi.isLoggedIn = true;
      header.render({ color: 'white', isLoggedIn: true, userName: res.name });

    })
    .catch(() => {
      mainApi.isLoggedIn = false;
      header.render({ color: 'white', isLoggedIn: false, userName: '' });
      localStorage.setItem('token', '');
    });
    // await mainApi.logout()
    // .then(() => {
    //   header.render({ isLoggedIn: false, userName: '' });
    //   localStorage.setItem('userData', '');
    //   // cardsContainer.textContent = '';
    //   // cardsBlock.classList.remove('cards_is-opened');
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

    // mainApi.getArticles()
    // .then((res) => {
    //   res.data.forEach(function(item) {
    //     cardList.addCard(item);

    //   });
    // });





    const logBtn = async (event) => {
      if(event.target.closest('#btn_auth')) {
        popup.setContent(popupSignin);

        popup.open();
        signInForm.init();


      }
      if(event.target.closest('#btn_logout')) {
        header.logout();
        window.location.href = '../index.html';
      }
    }

    document.querySelector('.button__auth').addEventListener('click', logBtn);
// document.querySelector('.popup__option_ok').addEventListener('click', openPopup);



  };



  initPage();