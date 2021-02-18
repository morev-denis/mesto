import './index.css'; // добавить импорт главного файла стилей
import { validationConfig } from '../utils/validation-config.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileAvatar = profile.querySelector('.profile__avatar-img');
const profileButtonEdit = document.querySelector('.profile__button_action_edit');
const profileButtonAdd = document.querySelector('.profile__button_action_add');
const popupProfileEdit = document.querySelector('.popup_feat_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container_feat_profile-edit');
const popupProfileEditFormName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileEditFormJob = popupProfileEdit.querySelector('.popup__input_field_job');
const popupProfileEditButtonSubmit = popupProfileEditForm.querySelector('.popup__button_action_submit');
const popupCardAdd = document.querySelector('.popup_feat_card-add');
const popupCardDelete = document.querySelector('.popup_feat_card-delete');
const popupCardAddForm = popupCardAdd.querySelector('.popup__container_feat_card-add');
const popupCardAddButtonSubmit = popupCardAddForm.querySelector('.popup__button_action_submit');
const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);
const userInfo = new UserInfo(profileName, profileJob);
const popupWithImage = new PopupWithImage(popupImageFullsize);
const api = new Api();
const popupWithSubmit = new PopupWithSubmit(popupCardDelete, {
  clickButtonHandler: (evt) => {
    evt.target.closest('.element').remove();
    popupWithSubmit.close();
  }
});

const createNewCard = (data) => {
  const card = new Card(data, elementTemplate, {
    handleCardClick: (placeLink, placeName) => {
      popupWithImage.open({ placeLink, placeName });
    },
    handleCardDelete: (evt) => {
      popupWithSubmit.open(evt);
    }
  });
  return card;
};

const cardSection = new Section({
  renderer: (item) => {
    const card = createNewCard(item, elementTemplate);
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  }
}, elementsGrid);

const popupWithFormProfile = new PopupWithForm(popupProfileEdit, {
  submit: (data) => {
    userInfo.setUserInfo(data);
    api.setUserInfo({ name: data.profileName, about: data.profileJob })
    .then((data) => {
      console.log(data);
    });
  }
});

const popupWithFormAdd = new PopupWithForm(popupCardAdd, {
  submit: (item) => {
    api.addCard({ name: item.name, link: item.link })
    .then((data) => {
      console.log(data);
    });

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
  cardAddFormValidator.disableButton(popupCardAddButtonSubmit); // Заблокировать кнопку
  popupWithFormAdd.open();
};

// Установить данные профиля с сервера
api.getUserInfo()
.then((data) => {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.src = data.avatar;
});

// Вывести карточки с сервера при загрузке
api.getInitialCards()
.then((data) => {
  cardSection.renderItems(data.reverse());
});

profileEditFormValidator.enableValidation(); // Включить валидацию формы редактирования профиля
cardAddFormValidator.enableValidation(); // Включить валидацию формы добавления нового места

popupWithFormProfile.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupWithSubmit.setEventListeners();

profileButtonEdit.addEventListener('click', () => { // Прикрепить обработчик к кнопке редактирования профиля
  openProfileEditHandler();
});
profileButtonAdd.addEventListener('click', () => { // Прикрепить обработчик к кнопке добавления нового места
  openCardAddHandler();
});
