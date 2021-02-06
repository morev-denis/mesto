import './index.css'; // добавить импорт главного файла стилей
import { initialCards } from '../utils/initial-cards.js';
import { validationConfig } from '../utils/validation-config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileButtonEdit = document.querySelector('.profile__button_action_edit');
const profileButtonAdd = document.querySelector('.profile__button_action_add');
const popupProfileEdit = document.querySelector('.popup_feat_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container_feat_profile-edit');
const popupProfileEditFormName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileEditFormJob = popupProfileEdit.querySelector('.popup__input_field_job');
const popupProfileEditButtonSubmit = popupProfileEditForm.querySelector('.popup__button_action_submit');
const popupCardAdd = document.querySelector('.popup_feat_card-add');
const popupCardAddForm = popupCardAdd.querySelector('.popup__container_feat_card-add');
const popupCardAddButtonSubmit = popupCardAddForm.querySelector('.popup__button_action_submit');
const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);
const userInfo = new UserInfo(profileName, profileJob);
const popupWithImage = new PopupWithImage(popupImageFullsize);

const createNewCard = (data) => {
  const card = new Card(data, elementTemplate, {
    handleCardClick: (placeLink, placeName) => {
      popupWithImage.open({ placeLink, placeName });
    }
  });

  return card;
};

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createNewCard(item, elementTemplate);
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  }
}, elementsGrid);

const popupWithFormProfile = new PopupWithForm(popupProfileEdit, {
  submit: (data) => {
    userInfo.setUserInfo(data);
  }
});

const popupWithFormAdd = new PopupWithForm(popupCardAdd, {
  submit: (item) => {
    const card = createNewCard(item, elementTemplate);
    const cardElement = card.createCard(); // Получить разметку карточки

    cardSection.addItem(cardElement); // Вставить разметку карточки в контейнер
  }
});

// Функция открытия попап редактирования профиля
const openProfileEditHandler = () => {
  popupProfileEditButtonSubmit.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения

  const userData = userInfo.getUserInfo();
  popupProfileEditFormName.value = userData.name;
  popupProfileEditFormJob.value = userData.job;

  popupWithFormProfile.open();
};

// Функция открытия попап добавления нового места
const openCardAddHandler = () => {
  popupCardAddButtonSubmit.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения

  popupWithFormAdd.open();
};

// Вывести карточки из массива при загрузке
cardSection.renderItems();

profileEditFormValidator.enableValidation(); // Включить валидацию формы редактирования профиля
cardAddFormValidator.enableValidation(); // Включить валидацию формы добавления нового места

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

profileButtonEdit.addEventListener('click', () => { // Прикрепить обработчик к кнопке редактирования профиля
  openProfileEditHandler();
});
profileButtonAdd.addEventListener('click', () => { // Прикрепить обработчик к кнопке добавления нового места
  openCardAddHandler();
});
