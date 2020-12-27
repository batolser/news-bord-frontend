export default class NewsApi {
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