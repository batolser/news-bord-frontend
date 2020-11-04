import '../styles/save.css';

import MainApi from './api/MainApi';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import KeyWordsCounter from './components/KeyWordsCounter'
import constants from './constants/constants';

const { popupSignin, RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST, SHOWMORE_BUTTON, KEYWORDS_ALL, KEYWORD_1, KEYWORD_2, KEYWORD_OTHERS } = constants;



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
      document.querySelector('.saved__title_login').textContent = res.name;
      mainApi.isLoggedIn = true;
      header.render({ color: 'black', isLoggedIn: true, userName: res.name });

    })
    .catch(() => {
      header.render({ color: 'white', isLoggedIn: false, userName: '' });
      localStorage.setItem('token', '');
      window.location.href = 'index.html';
      setTimeout(document.location.href = "index.html",500);
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
        window.location.href = 'index.html';
        setTimeout(document.location.href = "index.html", 500);
      }
    }

    document.querySelector('.button__auth').addEventListener('click', logBtn);

    const art = async () => {
      await mainApi.getArticles()
      .then((res) => {
        if(res.data.length === 0)
        {

            document.querySelector('.saved__title').textContent = 'У вас нет сохраненных статей';
            document.querySelector('.saved__description').classList.add('saved__description_inactive');
            document.querySelector('.results').classList.add('results_disactive');

        }
        else {
          res.data.forEach(function(item) {
          newsCardList.addCard(item);
          newsCardList.allCards = res.data;
        const allArticles = res.data.length;
        const sortedKeywords = keyWordsCounter.sortKeywords(newsCardList.countKeywords());
        keyWordsCounter.renderKeyWords(allArticles, sortedKeywords);

        })
      }

      })
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
      // document.querySelector('.cards-list').addEventListener('mousemove', newsCardList.addInfo.bind(newsCardList));
      // document.querySelector('.cards-list').addEventListener('mouseout', newsCardList.delInfo.bind(newsCardList));
    })
    }

    art();


    document.querySelector('.cards-list').addEventListener('click', newsCardList.toggleMark.bind(newsCardList));
    document.querySelector('.cards-list').addEventListener('mousemove', newsCardList.addInfo.bind(newsCardList));
    document.querySelector('.cards-list').addEventListener('mouseout', newsCardList.delInfo.bind(newsCardList));
  };



  initPage();



