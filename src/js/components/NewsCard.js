
import dateFormat from '../utilits/date';


export default class NewsCard {


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



    card.setAttribute('href', cardData.url || cardData.link || 'index.html');
    card.setAttribute('target', '_blank');
    card.setAttribute('data-id', cardData._id || undefined);
    cardImage.setAttribute('src', cardData.urlToImage || cardData.image || './src/images/image-not-found.jpg');
    cardImage.setAttribute('alt', 'Картинка');
    cardKeyword.textContent = cardData.keyword || keyWord;
    cardTag.textContent = 'Войдите, чтобы сохранять статьи';
    const dateCard = dateFormat.cardDate(new Date(cardData.publishedAt));
    cardDate.textContent = cardData.date || dateCard || '';
    cardTitle.textContent = cardData.title || 'Новость';
    cardText.textContent = cardData.description || cardData.text || 'Текст новости';
    cardSource.textContent = cardData.source.name || cardData.source || 'Ресурс';


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


}