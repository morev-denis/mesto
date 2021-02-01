import { disableScrollY, enableScrollY } from '../utils/utils.js';
import {
  root,
  popupProfileEditButtonClose,
  popupCardAddButtonClose,
  popupImageFullsizeButtonClose
} from '../utils/constants.js';

export default class Popup {
  constructor(targetPopup) {
    this._targetPopup = targetPopup;
  }

  // Метод закрытия попапа по крестику
  _handleButtonClose() {
    const popupOpened = document.querySelector('.popup_opened');
    this.close(popupOpened);
  }

  // Метод закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      this.close(popupOpened);
    }
  }

  // Метод закрытия попапа по клику на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.matches('.popup')) {
      const popupOpened = document.querySelector('.popup_opened');
      this.close(popupOpened);
    }
  }

  // Метод открытия попапа
  open() {
    this._targetPopup.classList.add('popup_opened');
    disableScrollY();
  }

  // Метод закрытия попапа
  close() {
    this._targetPopup.classList.remove('popup_opened');
    enableScrollY();
  }

  // Метод добавления слушателей на клик по оверлею, крестику, нажатию Esc
  setEventListeners() {
    root.addEventListener('keydown', (evt) =>  {
      this._handleEscClose(evt);
    });

    root.addEventListener('click', (evt) => {
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
