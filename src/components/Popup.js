import {
  root,
  popupProfileEditButtonClose,
  popupCardAddButtonClose,
  popupImageFullsizeButtonClose
} from '../utils/constants.js';

export default class Popup {
  constructor(targetPopup) {
    this._targetPopup = targetPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод закрытия попапа по крестику
  _handleButtonClose() {
    this.close(this._targetPopup);
  }

  // Метод закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._targetPopup);
    }
  }

  // Метод закрытия попапа по клику на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.matches('.popup')) {
      this.close(this._targetPopup);
    }
  }

  // Метод открытия попапа
  open() {
    this._targetPopup.classList.add('popup_opened');
    root.addEventListener('keydown', this._handleEscClose);  // Добавить слушатель на нажатие Esc
  }

  // Метод закрытия попапа
  close() {
    this._targetPopup.classList.remove('popup_opened');
    root.removeEventListener('keydown', this._handleEscClose); // Удалить слушатель на нажатие Esc
  }

  // Метод добавления слушателей на клик по оверлею, крестику
  setEventListeners() {

    this._targetPopup.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

    popupProfileEditButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
      this._handleButtonClose();
    });

    popupCardAddButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап добавления нового места
      this._handleButtonClose();
    });

    popupImageFullsizeButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап полноразмерной картинки
      this._handleButtonClose();
    });
  }
}
