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

// Функция отображения попап
function showPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

// Функция скрытия попап
function hidePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
}

// Функция открытия попап редактирования профиля
function handleProfileEditOpen() {
  showPopup(popupProfileEdit);
  popupProfileEditFormName.value = profileName.textContent;
  popupProfileEditFormJob.value = profileJob.textContent;
  disableScrollY();
}

// Функция закрытия попап редактирования профиля
function handleProfileEditClose() {
  popupProfileEdit.classList.remove('popup_opened');
  enableScrollY();
}

// Функция изменения Имени и О себе через попап
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  profileName.textContent = popupProfileEditFormName.value; // Присвоить Имени на HTML странице Имя из формы
  profileJob.textContent = popupProfileEditFormJob.value;  // Присвоить О себе на HTML странице О себе из формы
  handleProfileEditClose(); // Закрыть попап
}

// Функция открытия попап добавления нового места
function handelCardAddOpen() {
  showPopup(popupCardAdd);
  disableScrollY();
}

// Функция закрытия попап добавления нового места
function handleCardAddClose() {
  hidePopup(popupCardAdd);
  enableScrollY();
}

// Функция открытия попап с полноразмерной картинкой
function handleImageFullsizeOpen(link, name) {
  popupImageFullsizeImg.src = link;
  popupImageFullsizeImg.alt = name;
  popupImageFullsizeHeading.textContent = name;
  showPopup(popupImageFullsize);
  disableScrollY();
}

// Функция закрытия попап с полноразмерной картинкой
function handleImageFullsizeClose() {
  hidePopup(popupImageFullsize);
  enableScrollY();
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
    handleImageFullsizeOpen(link, name);
  });

  return element;
}

// Функция добавления карточки
function addCard(element) {
  elementsGrid.prepend(element);
}

// Функция добавления нового места
function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  addCard(createCard(popupCardAddFormLink.value, popupCardAddFormName.value));
  handleCardAddClose(); // Закрыть попап
  popupCardAddForm.reset(); // Очистить поля ввода
}

// Вывод карточек из массива при загрузке
initialCards.forEach(function(item) {
  addCard(createCard(item.link, item.name));
});

profileButtonEdit.addEventListener('click', handleProfileEditOpen); // Прикрепить обработчик к кнопке редактирования профиля
profileButtonAdd.addEventListener('click', handelCardAddOpen); // Прикрепить обработчик к кнопке добавления нового места

popupProfileEditButtonClose.addEventListener('click', handleProfileEditClose); // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
popupProfileEditForm.addEventListener('submit', handleProfileFormSubmit); // Прикрепить обработчик к форме редактирования профиля

popupCardAddButtonClose.addEventListener('click', handleCardAddClose); // Прикрепить обработчик к кнопке закрытия попап добавления нового места
popupCardAddForm.addEventListener('submit', handleCardFormSubmit); // Прикрепить обработчик к форме добавления нового места

popupImageFullsizeButtonClose.addEventListener('click', handleImageFullsizeClose); // Прикрепить обработчик к кнопке закрытия попап полноразмерной картинки
