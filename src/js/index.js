import '../styles/style.css';

import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import Header from './components/Header';
import FormSignUp from './components/FormSignUp';
import FormSignIn from './components/FormSignIn';
import Popup from './components/Popup';
// import PopupOk from './components/PopupOk';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';

import constants from './constants/constants';



const { popupSignin, RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST, SHOWMORE_BUTTON, SEARCH_FORM } = constants;





const newsApi = new NewsApi();

const mainApi = new MainApi ();

const header = new Header({ color: 'white' });

const newsCard = new NewsCard();
const newsCardList = new NewsCardList(RESULTS_CONTAINER, NEWSCARDS_CONTAINER, CARDS_LIST,
  SHOWMORE_BUTTON, newsCard, mainApi);
  newsCardList.setEventListener();


  const signUpForm = new FormSignUp(mainApi);
  const signInForm = new FormSignIn(mainApi, header);



  const popup = new Popup(signUpForm, signInForm);



  // const openPopupOk = new PopupOk();

  const searchFormSubmit = async (event) => {
    event.preventDefault();
    newsCardList.clearCardList();
    newsCardList.removeListeners();
    document.querySelector('.results').classList.remove('results_disactive');
    document.querySelector('.loading').classList.remove('loading_disactive');

    const keyWord = SEARCH_FORM.children[0].value;

      newsApi.getNews(keyWord)
        .then((res) => {
          if (res.articles.length !== 0) {
            document.querySelector('.results').classList.add('results_disactive');
    document.querySelector('.loading').classList.add('loading_disactive');
    document.querySelector('.loading__nothing').classList.add('loading_disactive');

            newsCardList.setArticlesArray(res.articles, keyWord);
            newsCardList.renderResults();

          }
          else if ((res.articles.length === 0)) {
            document.querySelector('.results').classList.remove('results_disactive');
    document.querySelector('.loading__nothing').classList.remove('loading_disactive');
    document.querySelector('.loading__cards').classList.add('loading_disactive');

          }
        })
        .catch((err) => {

          document.querySelector('.loading').classList.add('loading_disactive');
    document.querySelector('.loading__nothing').classList.remove('loading_disactive');
    document.querySelector('.loading__cards').classList.add('loading_disactive');
        console.error(`Произошла ошибка: "${err.message}"`)
        })


        SEARCH_FORM.children[0].value = '';


  };

  SEARCH_FORM.addEventListener('submit', searchFormSubmit);

// const openPopup = async () => {
//   popup.setContent(popupSignin);

//   popup.open();
//   signInForm.init();
// }

// export default {
//   logout: async () => {
//       header.logout();
//     },
//   openPopup: async () => {
//       popup.setContent(popupSignin);

//       popup.open();
//       signInForm.init();
//     },
//   }

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
        window.location.href = 'index.html';
      }
    }

    document.querySelector('.button__auth').addEventListener('click', logBtn);



  };



  initPage();