import { initialCards } from '../utils/initial-cards.js';
import { validationConfig } from '../utils/validation-config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import {
          profileName, profileJob, profileButtonEdit, profileButtonAdd,
          popupProfileEdit, popupProfileEditForm, popupProfileEditButtonClose,
          popupProfileEditFormName, popupProfileEditFormJob, popupCardAdd,
          popupCardAddForm, popupCardAddButtonClose, popupCardAddFormName,
          popupCardAddFormLink, buttonCardAdd, popupImageFullsize,
          popupImageFullsizeButtonClose, elementTemplate, elementsGrid
        } from '../utils/constants.js'

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, elementTemplate);
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  }

}, elementsGrid)

// Функция открытия попапа
const showPopup = (targetPopup) => {
  const popup = new Popup(targetPopup);
  popup.open(); // Показать попап
  popup.setEventListeners(); // Добавить слушатели на клик по оверлею, нажатию Esc,
}

// Функция закрытия попап
const hidePopup = (targetPopup) => {
  const popup = new Popup(targetPopup);
  popup.close(); // Скрыть попап
  popup.unsetEventListeners(); // Снять слушатели на клик по оверлею, нажатию Esc,
}

// Функция открытия попап редактирования профиля
const openProfileEditHandler = () => {
  const userInfo = new UserInfo(profileName, profileJob);

  popupProfileEditForm.reset();

  popupProfileEditFormName.value = userInfo.getUserInfo().name;
  popupProfileEditFormJob.value = userInfo.getUserInfo().job;

  showPopup(popupProfileEdit);
}

// Функция изменения Имени и О себе через попап
const submitProfileEditHandler = (evt) => {
  evt.preventDefault(); // Отменить стандартную отправку формы

  const userInfo = new UserInfo(profileName, profileJob);

  userInfo.setUserInfo(popupProfileEditFormName, popupProfileEditFormJob);

  hidePopup(popupProfileEdit); // Закрыть попап
}

// Функция открытия попап добавления нового места
const openCardAddHandler = () => {
  buttonCardAdd.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения
  popupCardAddForm.reset();
  showPopup(popupCardAdd);
}

// Функция добавления нового места
const submitCardAddHandler = (evt) => {
  evt.preventDefault(); // Отменить стандартную отправку формы

  const card = new Card(popupCardAddFormLink.value, popupCardAddFormName.value, elementTemplate);
  const cardElement = card.createCard(); // Получить разметку карточки

  const section = new Section({}, elementsGrid);
  section.addItem(cardElement); // Вставить разметку карточки в контейнер

  hidePopup(popupCardAdd); // Закрыть попап
}

// Вывести карточки из массива при загрузке
cardSection.renderItems();

profileEditFormValidator.enableValidation(); // Включить валидацию формы редактирования профиля
cardAddFormValidator.enableValidation(); // Включить валидацию формы добавления нового места

profileButtonEdit.addEventListener('click', () => { // Прикрепить обработчик к кнопке редактирования профиля
  openProfileEditHandler();
});
profileButtonAdd.addEventListener('click', () => { // Прикрепить обработчик к кнопке добавления нового места
  openCardAddHandler();
});

popupProfileEditButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
  hidePopup(popupProfileEdit);
});
popupProfileEditForm.addEventListener('submit', (evt) => { // Прикрепить обработчик к форме редактирования профиля
  submitProfileEditHandler(evt);
});

popupCardAddButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап добавления нового места
  hidePopup(popupCardAdd);
});
popupCardAddForm.addEventListener('submit', (evt) => { // Прикрепить обработчик к форме добавления нового места
  submitCardAddHandler(evt);
});

popupImageFullsizeButtonClose.addEventListener('click', () => { // Прикрепить обработчик к кнопке закрытия попап полноразмерной картинки
  hidePopup(popupImageFullsize);
});

export { showPopup };
