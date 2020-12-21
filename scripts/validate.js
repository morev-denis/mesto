// Функция отображения ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, listValidationClassesSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(listValidationClassesSelectors.inputErrorClass);
  errorElement.classList.add(listValidationClassesSelectors.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция скрытия ошибки валидации
const hideInputError = (formElement, inputElement, listValidationClassesSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(listValidationClassesSelectors.inputErrorClass);
  errorElement.classList.remove(listValidationClassesSelectors.errorClass);
  errorElement.textContent = '';
};

// Функция валидации поля
const isValid = (formElement, inputElement, listValidationClassesSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, listValidationClassesSelectors);
  } else {
    hideInputError(formElement, inputElement, listValidationClassesSelectors);
  }
};

// Функция установки слушателей на все поля формы
const setEventListners = (formElement, listValidationClassesSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(listValidationClassesSelectors.inputSelector));
  const buttonElement = formElement.querySelector(listValidationClassesSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, listValidationClassesSelectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, listValidationClassesSelectors);
      toggleButtonState(inputList, buttonElement, listValidationClassesSelectors);
    });
  });
};

// Функция валидации всех форм
const enableValidation = (listValidationClassesSelectors) => {
  const formList = Array.from(document.querySelectorAll(listValidationClassesSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListners(formElement, listValidationClassesSelectors);
  });
};

// Функция проверки валидности всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция (раз)блокировки кнопки при валидации полей
const toggleButtonState = (inputList, buttonElement, listValidationClassesSelectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(listValidationClassesSelectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(listValidationClassesSelectors.inactiveButtonClass);
  }
};

enableValidation({
  formSelector: '.popup__container_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_action_submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
