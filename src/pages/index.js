import './index.css'; // добавить импорт главного файла стилей
import { initialCards } from '../utils/initial-cards.js';
import { validationConfig } from '../utils/validation-config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  profileButtonEdit,
  profileButtonAdd,
  profileName,
  profileJob,
  popupProfileEdit,
  popupProfileEditForm,
  popupProfileEditFormName,
  popupProfileEditFormJob,
  popupProfileEditButtonSubmit,
  popupCardAdd,
  popupCardAddForm,
  popupCardAddFormName,
  popupCardAddFormLink,
  popupCardAddButtonSubmit,
  elementTemplate,
  elementsGrid
} from '../utils/constants.js';

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, elementTemplate);
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  }
}, elementsGrid);

const popupWithFormProfile = new PopupWithForm(popupProfileEdit, {
  submit: (data) => {
    const userInfo = new UserInfo(profileName, profileJob);

    userInfo.setUserInfo(data);
  }
});

const popupWithFormAdd = new PopupWithForm(popupCardAdd, {
  submit: () => {
    const card = new Card(popupCardAddFormLink.value, popupCardAddFormName.value, elementTemplate);
    const cardElement = card.createCard(); // Получить разметку карточки

    const section = new Section({}, elementsGrid);
    section.addItem(cardElement); // Вставить разметку карточки в контейнер
  }
});

// Функция открытия попап редактирования профиля
const openProfileEditHandler = () => {
  popupProfileEditButtonSubmit.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения
  const userInfo = new UserInfo(profileName, profileJob);

  popupProfileEditFormName.value = userInfo.getUserInfo().name;
  popupProfileEditFormJob.value = userInfo.getUserInfo().job;

  popupWithFormProfile.open();
  popupWithFormProfile.setEventListeners();
};

// Функция открытия попап добавления нового места
const openCardAddHandler = () => {
  popupCardAddButtonSubmit.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения

  popupWithFormAdd.open();
  popupWithFormAdd.setEventListeners();
};

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
