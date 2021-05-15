export default class Api {
  constructor({ headers, serverUrl }) {
    this._headers = headers;
    this._serverUrl = serverUrl;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  initData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  setUserInfo({ name, about, avatar }) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
        avatar: `${avatar}`,
      }),
    }).then(this._handleResponse);
  }

  setLike(data) {
    return fetch(`${this._serverUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  unsetLike(data) {
    return fetch(`${this._serverUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).then(this._handleResponse);
  }
}
