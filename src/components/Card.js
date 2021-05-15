export default class Card {
  constructor(
    data,
    elementTemplate,
    ownerId,
    { handleCardClick, handleCardDelete, setLike, unsetLike },
  ) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._elementTemplate = elementTemplate;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._setLike = setLike;
    this._unsetLike = unsetLike;
  }

  // Метод возврата разметки карточки
  _getTemplate() {
    const element = this._elementTemplate.cloneNode(true);

    return element;
  }

  // Метод проверки является ли карточка моей
  _isMyCard() {
    if (this._ownerId === this._data.owner._id) {
      return true;
    }
    return false;
  }

  // Метод удаления кнопки удаления с чужих карточек
  _removeDelButtonNotMyCard(delButton) {
    if (!this._isMyCard()) {
      delButton.remove();
      delButton = null;
    }
  }

  _like(data) {
    this._elementLikeButton.classList.add('element__like_active');
    this._setLike(data);
  }

  _unlike(data) {
    this._elementLikeButton.classList.remove('element__like_active');
    this._unsetLike(data);
  }

  // Метод установки (снятия) лайка
  _toggleLikeHandler() {
    if (this._elementLikeButton.classList.contains('element__like_active')) {
      this._unlike(this._data);
    } else {
      this._like(this._data);
    }
  }

  // Метод установки количества лайков
  renderLikeNum(data) {
    this._elementLikeNum.textContent = String(data.likes.length);
  }

  _renderLikeStatus() {
    this._data.likes.forEach((item) => {
      if (item._id === this._ownerId) {
        this._elementLikeButton.classList.add('element__like_active');
      }
    });
  }

  // Метод установки слушателей на кнопки лайка, корзины, крестика
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      // Прикрепить обработчик к кнопке лайка
      this._toggleLikeHandler(evt);
    });

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', this._handleCardDelete); // Прикрепить обработчик к кнопке корзины

    this._elementImage.addEventListener('click', () => {
      // Прикрепить обработчик к картинке карточки
      this._handleCardClick(this._elementImage.src, this._elementImage.alt);
    });
  }

  // Метод создания карточки - добавление данных, установка слушателей
  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementHeading = this._element.querySelector('.element__heading');
    this._elementLikeButton = this._element.querySelector('.element__like');
    this._elementLikeNum = this._element.querySelector('.element__like-number');
    this._elementDelButton = this._element.querySelector('.element__delete');

    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._elementHeading.textContent = this._data.name;

    this.renderLikeNum(this._data); // Установить количество лайков у карточки
    this._setEventListeners();
    this._removeDelButtonNotMyCard(this._elementDelButton); // Убрать кнопку удаления с чужих карточек
    this._renderLikeStatus();

    return this._element;
  }
}
