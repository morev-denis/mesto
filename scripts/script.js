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

const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const popupImageFullsizeImg = popupImageFullsize.querySelector('.popup__image-fullsize');
const popupImageFullsizeHeading = popupImageFullsize.querySelector('.popup__heading_feat_image-fullsize');
const popupImageFullsizeButtonClose = popupImageFullsize.querySelector('.popup__button_action_close');

const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

// Функция запрета вертикального скролла
function disableScrollY() {
  root.classList.add('root_scroll_disable');
}

// Функция разрешения вертикального скролла
function enableScrollY() {
  root.classList.remove('root_scroll_disable');
}

// Функция закрытия попап по кнопке Escape
function closePopupByEscapeHandler(targetPopup, evt) {
  if (evt.key === 'Escape') {
    hidePopup(targetPopup);
  }
}

// Функция закрытия попап по клику на оверлей
function closePopupByClickOverlayHandler(targetPopup, evt) {
  if (evt.target.matches('.popup')) {
    hidePopup(targetPopup);
  }
}

// Функция отображения попап
function showPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  disableScrollY();
  root.addEventListener('keydown', function (evt) {
    closePopupByEscapeHandler(targetPopup, evt);
  });
  root.addEventListener('click', function (evt) {
    closePopupByClickOverlayHandler(targetPopup, evt);
  });
}

// Функция скрытия попап
function hidePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  enableScrollY();
}

// Функция открытия попап редактирования профиля
function openProfileEditHandler() {
  const formElement = document.querySelector('.popup__container_feat_profile-edit');
  const inputElementName = formElement.querySelector('.popup__input_field_name');
  const inputElementJob = formElement.querySelector('.popup__input_field_job');
  hideInputError(formElement, inputElementName, validationConfig); // Сбросить ошибки валидации в поле Имя
  hideInputError(formElement, inputElementJob, validationConfig); // Сбросить ошибки валидации в поле О себе
  showPopup(popupProfileEdit);
  popupProfileEditFormName.value = profileName.textContent;
  popupProfileEditFormJob.value = profileJob.textContent;
}

// Функция закрытия попап редактирования профиля
function closeProfileEditHandler() {
  hidePopup(popupProfileEdit);
}

// Функция изменения Имени и О себе через попап
function submitProfileEditHandler(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  profileName.textContent = popupProfileEditFormName.value; // Присвоить Имени на HTML странице Имя из формы
  profileJob.textContent = popupProfileEditFormJob.value;  // Присвоить О себе на HTML странице О себе из формы
  closeProfileEditHandler(); // Закрыть попап
}

// Функция открытия попап добавления нового места
function openCardAddHandler () {
  const formElement = document.querySelector('.popup__container_feat_card-add');
  const inputElementPlace = formElement.querySelector('.popup__input_field_place');
  const inputElementLink = formElement.querySelector('.popup__input_field_link');
  const buttonElement = formElement.querySelector('.popup__button_action_submit');
  buttonElement.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения
  hideInputError(formElement, inputElementPlace, validationConfig); // Сбросить ошибки валидации в поле Имя
  hideInputError(formElement, inputElementLink, validationConfig); // Сбросить ошибки валидации в поле Ссылка
  showPopup(popupCardAdd);
  popupCardAddForm.reset();
}

// Функция закрытия попап добавления нового места
function closeAddCardPopupHandler () {
  hidePopup(popupCardAdd);
}

// Функция открытия попап с полноразмерной картинкой
function opneImageFullsizeHandler(link, name) {
  popupImageFullsizeImg.src = link;
  popupImageFullsizeImg.alt = name;
  popupImageFullsizeHeading.textContent = name;
  showPopup(popupImageFullsize);
}

// Функция закрытия попап с полноразмерной картинкой
function openImageFullsizeHandler() {
  hidePopup(popupImageFullsize);
}

// Функция формирования содержимого карточки
function createCard(link, name) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  elementImage.src = link;
  elementImage.alt = name;
  element.querySelector('.element__heading').textContent = name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  elementImage.addEventListener('click', function () {
    opneImageFullsizeHandler(link, name);
  });

  return element;
}

// Функция добавления карточки
function addCard(element) {
  elementsGrid.prepend(element);
}

// Функция добавления нового места
function submitCardAddHandler(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  addCard(createCard(popupCardAddFormLink.value, popupCardAddFormName.value));
  closeAddCardPopupHandler (); // Закрыть попап
}

// Вывод карточек из массива при загрузке
initialCards.forEach(function(item) {
  addCard(createCard(item.link, item.name));
});

profileButtonEdit.addEventListener('click', openProfileEditHandler); // Прикрепить обработчик к кнопке редактирования профиля
profileButtonAdd.addEventListener('click', openCardAddHandler ); // Прикрепить обработчик к кнопке добавления нового места

popupProfileEditButtonClose.addEventListener('click', closeProfileEditHandler); // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
popupProfileEditForm.addEventListener('submit', submitProfileEditHandler); // Прикрепить обработчик к форме редактирования профиля

popupCardAddButtonClose.addEventListener('click', closeAddCardPopupHandler ); // Прикрепить обработчик к кнопке закрытия попап добавления нового места
popupCardAddForm.addEventListener('submit', submitCardAddHandler); // Прикрепить обработчик к форме добавления нового места

popupImageFullsizeButtonClose.addEventListener('click', openImageFullsizeHandler); // Прикрепить обработчик к кнопке закрытия попап полноразмерной картинки
