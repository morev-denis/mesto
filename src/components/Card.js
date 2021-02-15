export default class Card {
  constructor({ link, name }, elementTemplate, { handleCardClick }) {
    this._link = link;
    this._name = name;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
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

  // Метод удаления карточки
  _removeCardHandler(evt) {
    evt.target.closest('.element').remove();
  }

  // Метод установки слушателей на кнопки лайка, корзины, крестика
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => { // Прикрепить обработчик к кнопке лайка
      this._toggleLikeHandler(evt);
    });

    this._element.querySelector('.element__delete').addEventListener('click', (evt) => { // Прикрепить обработчик к кнопке корзины
      this._removeCardHandler(evt);
    });

    this._elementImage.addEventListener('click', () => { // Прикрепить обработчик к картинке карточки
      this._handleCardClick(this._elementImage.src, this._elementImage.alt);
    });
  }

  // Метод создания карточки - добавление данных, установка слушателей
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementHeading = this._element.querySelector('.element__heading');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementHeading.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
