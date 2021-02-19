import Popup from './Popup.js';
import { popupButtonSubmitSelector } from '../utils/constants.js';

export default class PopupWithSubmit extends Popup {
  constructor(targetPopup, { clickButtonHandler }) {
    super(targetPopup);
    this._button = this._targetPopup.querySelector(popupButtonSubmitSelector);
    this._clickButtonHandler = clickButtonHandler;
    this._clickEvtHandler = this._clickEvtHandler.bind(this);
  }

  _clickEvtHandler() {
    this._clickButtonHandler(this._data);
  }

  setEventListeners() {
    this._button.addEventListener('click', (evt) => {
      this._clickEvtHandler();
      // evt.target.closest('.element').remove();
    });
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
