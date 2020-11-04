import BaseComponent from './BaseComponent';

import NewsCard from './NewsCard';
const newsCard = new NewsCard();

import constants from '../constants/constants';
const { CARDS_LIST, KEYWORDS_ALL, KEYWORD_1, KEYWORD_2, KEYWORD_OTHERS } = constants;

import KeyWordsCounter from './KeyWordsCounter';

const keyWordsCounter = new KeyWordsCounter(KEYWORDS_ALL, KEYWORD_1, KEYWORD_2, KEYWORD_OTHERS);

export default class NewsCardList extends BaseComponent {
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
    // this.keyWord = keyWord;
    // this.handlers = [
    //   { element: document.querySelector('.card__icon_bookmark'), event: 'click', callback: () => addArticles() }
    // ];

  }

  countKeywords() {
    this.keywords = {};
    this.allCards.forEach((item) => {
      if (!this.keywords[item.keyword]) {
        this.keywords[item.keyword] = 1;
      } else {
        this.keywords[item.keyword] += 1;
      }
    })
    return this.keywords;
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

      else {
        // this._allFoundedArticles.forEach(function(item) {
        //       this.addCard(item, this.keyWord);

        //     });

             this._showMoreButton.classList.add('button__hide');
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

      this._setHandlers([{
        element: this._cardList,
        event: 'mousemove',
        callback: (event) => this.addInfo(event),
      }]);


      this._setHandlers([{
        element: this._cardList,
        event: 'mouseout',
        callback: (event) => this.delInfo(event),
      }]);

    }

  _showMore() {
    this.removeListeners();
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

  addInfo(event) {
    if (event.target.classList.contains('card__icon_bookmark')) {
       if(!this.api.isLoggedIn) {
        event.preventDefault();

        event.target.previousSibling.classList.remove('card__tag_disactive');
      }
      }
      if(event.target.classList.contains('card__icon_trash')) {
        event.preventDefault();

        event.target.previousSibling.classList.remove('card__tag_disactive');
        event.target.previousSibling.textContent = 'Убрать из сохранённых';
      }

  }

  delInfo(event) {
    if (event.target.classList.contains('card__icon_bookmark')) {
       if(!this.api.isLoggedIn) {
        event.preventDefault();

        event.target.previousSibling.classList.add('card__tag_disactive');
      }
      }
      if(event.target.classList.contains('card__icon_trash')) {
        event.preventDefault();

        event.target.previousSibling.classList.add('card__tag_disactive');
      }

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
          cardArticle.querySelector('.card__icon_bookmark').classList.add('card__icon_bookmark_marked');


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
        event.target.previousSibling.classList.remove('card__tag_disactive');
        event.target.previousSibling.textContent = 'Убрать из сохранённых';

const articleId = event.target.closest('.card').dataset.id;
      this.api.removeArticle(articleId);
      this.api.getArticles()
      .then((res) => {

        if(res.data.length === 0)
        {

            document.querySelector('.saved__title').textContent = 'У вас нет сохраненных статей';
            document.querySelector('.saved__description').classList.add('saved__description_inactive');
            document.querySelector('.results').classList.add('results_disactive');

        }
        else {
      const CardListArray = document.querySelectorAll('.card');
    CardListArray.forEach(function(item) {
      item.parentNode.removeChild(item);
    });

        res.data.forEach(function(item) {
          const element = newsCard.createCard(item, item.keyword);
          CARDS_LIST.appendChild(element);
          CARDS_LIST.allCards = res.data;
        const allArticles = res.data.length;
function sort (){
  const keywords = {};
        CARDS_LIST.allCards.forEach((item) => {
      if (!keywords[item.keyword]) {
        keywords[item.keyword] = 1;
      } else {
        keywords[item.keyword] += 1;
      }
    })
    return keywords;
}


        const sortedKeywords = keyWordsCounter.sortKeywords(
          sort ()

          );
        keyWordsCounter.renderKeyWords(allArticles, sortedKeywords);

        })




        let cards = document.querySelectorAll('.card__icon');

    cards.forEach(function(item) {
      item.classList.remove('card__icon_bookmark');
      item.classList.add('card__icon_trash');


})
this._setHandlers([{
  element: CARDS_LIST,
  event: 'click',
  callback: (event) => this.toggleMark(event),
}]);

this._setHandlers([{
  element: CARDS_LIST,
  event: 'mousemove',
  callback: (event) => this.addInfo(event),
}]);


this._setHandlers([{
  element: CARDS_LIST,
  event: 'mouseout',
  callback: (event) => this.delInfo(event),
}]);

        // document.querySelector('.cards-list').addEventListener('click', newsCardList.toggleMark.bind(newsCardList));
      }
      })
      // .then((res) => {

      // })
//       .then((res) => {
//           let cards = document.querySelectorAll('.card__icon');
//           // .querySelector('.card__icon').classList.remove('card__icon_bookmark');
//           // .querySelector('.card__icon').classList.add('card__icon_trash');

//       cards.forEach(function(item) {
//         item.classList.remove('card__icon_bookmark');
//         item.classList.add('card__icon_trash');
// })
//       }
//       )


      // event.target.closest('.card').querySelector('.card__icon').classList.add('card__icon_ok');
      //перерисовать выведенные карточки
      }
    }
  }