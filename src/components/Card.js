export default class Card {
  constructor(data, elementTemplate, { handleCardClick, handleCardDelete }) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  // Метод возврата разметки карточки
  _getTemplate() {
    const element = this._elementTemplate.cloneNode(true);

    return element;
  }

  // Метод установки (снятия) лайка
  _toggleLikeHandler(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  // Метод установки слушателей на кнопки лайка, корзины, крестика
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => { // Прикрепить обработчик к кнопке лайка
      this._toggleLikeHandler(evt);
    });

    this._element.querySelector('.element__delete').addEventListener('click', (evt) => { // Прикрепить обработчик к кнопке корзины
      this._handleCardDelete(evt);
    });

    this._elementImage.addEventListener('click', () => { // Прикрепить обработчик к картинке карточки
      this._handleCardClick(this._elementImage.src, this._elementImage.alt);
    });
  }

  // Метод установки количества лайков
  _renderLikeNum(data, element) {
    element.textContent = String(data.likes.length);
  }

  // Метод создания карточки - добавление данных, установка слушателей
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementHeading = this._element.querySelector('.element__heading');
    this._elementLikeNum = this._element.querySelector('.element__like-number');

    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._elementHeading.textContent = this._data.name;

    this._renderLikeNum(this._data, this._elementLikeNum); // Установить количество лайков у карточки

    this._setEventListeners();

    return this._element;
  }
}
