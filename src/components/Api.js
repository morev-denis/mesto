export default class Api {
  constructor() {

  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
      method: 'GET',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2'
      }
    })
    .then((res) => {
      return res.json();
    });
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
      method: 'GET',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2'
      }
    })
    .then((res) => {
      return res.json();
    });
  }

  setUserInfo({ name, about, avatar }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
        avatar: `${avatar}`
      })
    });
  }

  addCard({ name, link }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
      method: 'POST',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then((res) => {
      return res.json();
    });
  }

  deleteCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-20/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2',
        'Content-Type': 'application/json'
      }
    });
  }

  updateAvatar({ avatar }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    });
  }
}
