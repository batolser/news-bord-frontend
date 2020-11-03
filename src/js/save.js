import '../styles/save.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import KeyWordsCounter from './components/KeyWordsCounter'
import constants from './constants/constants';
const { popupSignin, RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST, SHOWMORE_BUTTON, KEYWORDS_ALL, KEYWORD_1, KEYWORD_2, KEYWORD_OTHERS } = constants;

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




//основной функционал

const mainApi = new MainApi ();

const header = new Header({ color: 'black' });

const newsCard = new NewsCard();
const newsCardList = new NewsCardList(RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST,
  SHOWMORE_BUTTON, newsCard, mainApi);



const keyWordsCounter = new KeyWordsCounter(KEYWORDS_ALL, KEYWORD_1, KEYWORD_2, KEYWORD_OTHERS);




    // const openPopup = async () => {
    //   popup.setContent(popupSignin);

    //   popup.open();
    //   signInForm.init();
    // }



  const initPage = async () => {


    await mainApi.getUserData()
    .then((res) => {
      // localStorage.setItem('token', res.token);
      mainApi.isLoggedIn = true;
      header.render({ color: 'black', isLoggedIn: true, userName: res.name });

    })
    .catch(() => {
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




    // const signUpForm = new FormSignUp(mainApi);
    // const signInForm = new FormSignIn(mainApi, header);

    // const popup = new Popup(signUpForm, signInForm);


    const logBtn = async (event) => {
      if(event.target.closest('#btn_auth')) {
        popup.setContent(popupSignin);

        popup.open();
        signInForm.init();


      }
      if(event.target.closest('#btn_logout')) {
        header.logout();
      }
    }

    document.querySelector('.button__auth').addEventListener('click', logBtn);

    const art = async () => {
      await mainApi.getArticles()
      .then((res) => {
        res.data.forEach(function(item) {
          newsCardList.addCard(item);
          newsCardList.allCards = res.data;
        const allArticles = res.data.length;
        const sortedKeywords = keyWordsCounter.sortKeywords(newsCardList.countKeywords());
        keyWordsCounter.renderKeyWords(allArticles, sortedKeywords);

        })

        // document.querySelector('.cards-list').addEventListener('click', newsCardList.toggleMark.bind(newsCardList));

      })
      // .then((res) => {

      // })
      .then((res) => {
          let cards = document.querySelectorAll('.card__icon');
          // .querySelector('.card__icon').classList.remove('card__icon_bookmark');
          // .querySelector('.card__icon').classList.add('card__icon_trash');

      cards.forEach(function(item) {
        item.classList.remove('card__icon_bookmark');
        item.classList.add('card__icon_trash');
})
      }
      )
      .then(() => {
      document.querySelector('.cards-list').addEventListener('click', newsCardList.toggleMark.bind(newsCardList));
    })
    }

    art();




  };



  initPage();



