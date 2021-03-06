export default class MainApi {
  constructor() {
    this._mainURL = 'http://localhost:3000';
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
  }

  removeArticle(articleId) {
    return fetch(`${this._mainURL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
  })
  .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
}







getArticles() {
  return fetch(`${this._mainURL}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }) .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Код ошибки: ${res.message}, Сообщение: ${res.status}`));
  })
  // .then((res) => {
  //   return res.json();
  // })
  .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
}

}