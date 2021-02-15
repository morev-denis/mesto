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

}
