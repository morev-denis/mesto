export default class FormValidator {
  constructor(validationConfig, targetForm) {
    this._validationConfig = validationConfig;
    this._targetForm = targetForm;
  }

  // Метод отображения ошибки валидации
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    errorElement.textContent = errorMessage;
  };

  // Метод скрытия ошибки валидации
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  // Метод валидации поля
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // Метод установки слушателей на все поля формы
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(this._validationConfig.submitButtonSelector);

    formElement.addEventListener('reset', () => { // Установить слушатель на сброс формы, сбросить ошибки валидации, заблокировать кнопку
      inputList.forEach((inputElement) => {
        this._hideInputError(formElement, inputElement);
        buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      });
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // Метод проверки валидности всех полей формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Метод (раз)блокировки кнопки при валидации полей
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  };

  enableValidation() {
    this._targetForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._targetForm);
  }
}
