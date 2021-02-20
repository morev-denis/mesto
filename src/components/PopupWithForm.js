import Popup from './Popup.js';
import { popupFormSelector, popupFormInputSelector } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(targetPopup, { submit }) {
    super(targetPopup);
    this._form = this._targetPopup.querySelector(popupFormSelector);
    this._submit = submit;
    this._submitHandler = this._submitHandler.bind(this);
    this._buttonSubmit = this._form.querySelector('.popup__button_action_submit');
  }

  // Метод сбора данных всех полей формы
  _getInputValues() {
    const inputsArray = Array.from(this._form.querySelectorAll(popupFormInputSelector));
    const data = {};

    inputsArray.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  // Метод отправки формы
  _submitHandler(evt) {
    evt.preventDefault(); // Отменить стандартную отправку формы
    this._submit(this._getInputValues());
  }

  renderSubmitProgress(message) {
    this._buttonSubmit.textContent = message;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
