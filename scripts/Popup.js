const root = document.querySelector('.root');

class Popup {
  constructor(targetPopup) {
    this._targetPopup = targetPopup;
  }

  // Метод запрета вертикального скролла
  _disableScrollY() {
    root.classList.add('root_scroll_disable');
  }

  // Метод разрешения вертикального скролла
  _enableScrollY() {
    root.classList.remove('root_scroll_disable');
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
    this._disableScrollY();
  }

  // Метод закрытия попапа
  close() {
    this._targetPopup.classList.remove('popup_opened');
    this._enableScrollY();
  }

  // Метод добавления слушателей на клик по оверлею, нажатию Esc
  setEventListeners() {
    root.addEventListener('keydown', (evt) =>  {
      this._handleEscClose(evt);
    });

    root.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

  }

  // Метод снятия слушателей на клик по оверлею, нажатию Esc
  unsetEventListeners() {
    root.removeEventListener('keydown', (evt) =>  {
      this._handleEscClose(evt);
    });

    root.removeEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });

  }

}

export {Popup};
