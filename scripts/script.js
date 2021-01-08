import {initialCards} from './initial-cards.js';
import {validationConfig} from './validation-config.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const root = document.querySelector('.root');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileButtonEdit = document.querySelector('.profile__button_action_edit');
const profileButtonAdd = document.querySelector('.profile__button_action_add');

const popupProfileEdit = document.querySelector('.popup_feat_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container_feat_profile-edit');
const popupProfileEditButtonClose = popupProfileEdit.querySelector('.popup__button_action_close');
const popupProfileEditFormName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileEditFormJob = popupProfileEdit.querySelector('.popup__input_field_job');

const popupCardAdd = document.querySelector('.popup_feat_card-add');
const popupCardAddForm = popupCardAdd.querySelector('.popup__container_feat_card-add');
const popupCardAddButtonClose = popupCardAdd.querySelector('.popup__button_action_close');
const popupCardAddFormName = popupCardAdd.querySelector('.popup__input_field_place');
const popupCardAddFormLink = popupCardAdd.querySelector('.popup__input_field_link');
const buttonCardAdd = popupCardAddForm.querySelector('.popup__button_action_submit');

const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const popupImageFullsizeButtonClose = popupImageFullsize.querySelector('.popup__button_action_close');

const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);

// Функция запрета вертикального скролла
const disableScrollY = () => {
  root.classList.add('root_scroll_disable');
}

// Функция разрешения вертикального скролла
const enableScrollY = () => {
  root.classList.remove('root_scroll_disable');
}

// Функция закрытия попап по кнопке Escape
const closePopupByEscapeHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    hidePopup(popupOpened);
  }
}

// Функция закрытия попап по клику на оверлей
const closePopupByClickOverlayHandler = (evt) => {
  if (evt.target.matches('.popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    hidePopup(popupOpened);
  }
}

// Функция отображения попап
const showPopup = (targetPopup) => {
  targetPopup.classList.add('popup_opened');
  disableScrollY();
  root.addEventListener('keydown', closePopupByEscapeHandler);
  root.addEventListener('click', closePopupByClickOverlayHandler);
}

// Функция скрытия попап
const hidePopup = (targetPopup) => {
  targetPopup.classList.remove('popup_opened');
  enableScrollY();
  root.removeEventListener('keydown', closePopupByEscapeHandler);
  root.removeEventListener('click', closePopupByClickOverlayHandler);
}

// Функция открытия попап редактирования профиля
const openProfileEditHandler = () => {
  popupProfileEditForm.reset();
  popupProfileEditFormName.value = profileName.textContent;
  popupProfileEditFormJob.value = profileJob.textContent;
  showPopup(popupProfileEdit);
}

// Функция изменения Имени и О себе через попап
const submitProfileEditHandler = (evt) => {
  evt.preventDefault(); // Отменить стандартную отправку формы
  profileName.textContent = popupProfileEditFormName.value; // Присвоить Имени на HTML странице Имя из формы
  profileJob.textContent = popupProfileEditFormJob.value;  // Присвоить О себе на HTML странице О себе из формы
  hidePopup(popupProfileEdit); // Закрыть попап
}

// Функция открытия попап добавления нового места
const openCardAddHandler = () => {
  buttonCardAdd.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения
  popupCardAddForm.reset();
  showPopup(popupCardAdd);
}

// Функция добавления карточки
const addCard = (element) => {
  elementsGrid.prepend(element);
}

// Функция добавления нового места
const submitCardAddHandler = (evt) => {
  evt.preventDefault(); // Отменить стандартную отправку формы

  const card = new Card(popupCardAddFormLink.value, popupCardAddFormName.value, elementTemplate);
  const cardElement = card.createCard();

  addCard(cardElement);
  hidePopup(popupCardAdd); // Закрыть попап
}

// Вывести карточки из массива при загрузке
initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, elementTemplate);
  const cardElement = card.createCard();

  addCard(cardElement);
});

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

export {showPopup};
