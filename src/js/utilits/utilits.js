import MainApi from '../api/MainApi';

const mainApi = new MainApi ();

export default {

  openPopup: async () => {
      popup.setContent(popupSignin);

      popup.open();
      signInForm.init();
    },
    art: async () => {
      await mainApi.getArticles()
      .then((res) => {
        res.data.forEach(function(item) {
          newsCardList.addCard(item);
          newsCardList.allCards = res.data;
        const allArticles = res.data.length;
        const sortedKeywords = keyWordsCounter.sortKeywords(newsCardList.countKeywords());
        keyWordsCounter.renderKeyWords(allArticles, sortedKeywords);

        })
      })
      .then((res) => {
          const cards = document.querySelectorAll('.card__icon');
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
    },
  }