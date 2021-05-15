import { popupButtonCloseSelector } from '../utils/constants.js';

const root = document.querySelector('.root');

export default class Popup {
  constructor(targetPopup) {
    this._targetPopup = targetPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод закрытия попапа по крестику
  _handleButtonClose() {
    this.close();
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
    root.addEventListener('keydown', this._handleEscClose); // Прикрепить обработчик на нажатие Esc
  }

  // Метод закрытия попапа
  close() {
    this._targetPopup.classList.remove('popup_opened');
    root.removeEventListener('keydown', this._handleEscClose); // Убрать обработчик на нажатие Esc
  }

  // Метод добавления слушателей на клик по оверлею, крестику
  setEventListeners() {
    this._targetPopup.addEventListener('click', (evt) => {
      // Прикрепить обработчик клика по оверлею
      this._handleOverlayClose(evt);
    });

    this._targetPopup.querySelector(popupButtonCloseSelector).addEventListener('click', () => {
      // Прикрепить обработчик к кнопке закрытия попапа
      this._handleButtonClose();
    });
  }
}
