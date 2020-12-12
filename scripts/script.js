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

const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

// Массив для вывода карточек при загрузке
const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: './images/elements/__element/elements__element_kirill-pershin-1088404-unsplash.jpg',
    alt: 'Крепость в Карачаево-Черкессии'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elements/__element/elements__element_kirill-pershin-1404681-unsplash.jpg',
    alt: 'Вершины Эльбруса'
  },
  {
    name: 'Домбай',
    link: './images/elements/__element/elements__element_kirill-pershin-1556355-unsplash.jpg',
    alt: 'Горы Домбая'
  },
  {
    name: 'Псков',
    link: './images/elements/__element/elements__element_fortress-4490460_1280.jpg',
    alt: 'Вид на крепость Пскова'
  },
  {
    name: 'Ярославль',
    link: './images/elements/__element/elements__element_river-2615647_1280.jpg',
    alt: 'Вид на стрелку Ярославля'
  },
  {
    name: 'Рыбинск',
    link: './images/elements/__element/elements__element_rybinsk-887045_1280.jpg',
    alt: 'Вид на набережную Рыбинска'
  }
];

// Функция запрета вертикального скролла
function disableScrollY() {
  document.body.style.overflowY = 'hidden';
}

// Функция разрешения вертикального скролла
function enableScrollY() {
  document.body.style.overflowY = 'auto'; //
}

// Функция отображения попап
function displayPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

// Функция скрытия попап
function hidePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
}

// Функция открытия попап редактирования профиля
function openPopupProfileEdit() {
  displayPopup(popupProfileEdit);
  popupProfileEditFormName.value = profileName.textContent;
  popupProfileEditFormJob.value = profileJob.textContent;
  disableScrollY();
}

// Функция закрытия попап редактирования профиля
function closePopupProfileEdit() {
  popupProfileEdit.classList.remove('popup_opened');
  enableScrollY();
}

// Функция изменения Имени и О себе через попап
function popupProfileEditFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  profileName.textContent = popupProfileEditFormName.value; // Присвоить Имени на HTML странице Имя из формы
  profileJob.textContent = popupProfileEditFormJob.value;  // Присвоить О себе на HTML странице О себе из формы
  closePopupProfileEdit(); // Закрыть попап
}

// Функция открытия попап добавления нового места
function openPopupCardAdd() {
  displayPopup(popupCardAdd);
  disableScrollY();
}

// Функция закрытия попап добавления нового места
function closePopupCardAdd() {
  hidePopup(popupCardAdd);
  enableScrollY();
}

// Функция формирования содержимого карточки
function generateCard(link, alt, name) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = alt;
  element.querySelector('.element__heading').textContent = name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  element.querySelector('.element__image').addEventListener('click', function (evt) {
    popupImageFullsize.querySelector('.popup__image-fullsize').src = evt.target.src;
    popupImageFullsize.querySelector('.popup__heading_feat_image-fullsize').textContent = evt.target.nextElementSibling.querySelector('.element__heading').textContent;
    displayPopup(popupImageFullsize);
    disableScrollY();
  });

  popupImageFullsize.querySelector('.popup__button_action_close').addEventListener('click', function (evt) {
    hidePopup(popupImageFullsize);
    enableScrollY();
  });
  elementsGrid.prepend(element);
}

// Функция добавления нового места
function popupCardAddFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  generateCard(popupCardAddFormLink.value, popupCardAddFormName.value, popupCardAddFormName.value);
  closePopupCardAdd(); // Закрыть попап
  popupCardAddFormLink.value = ''; // Очистить поле ввода Ссылка на картинку
  popupCardAddFormName.value = ''; // Очистить поле ввода Название
}

// Вывод карточек из массива при загрузке
initialCards.forEach(function(item) {
  generateCard(item.link, item.alt, item.name);
});

profileButtonEdit.addEventListener('click', openPopupProfileEdit); // Прикрепить обработчик к кнопке редактирования профиля
profileButtonAdd.addEventListener('click', openPopupCardAdd); // Прикрепить обработчик к кнопке добавления нового места

popupProfileEditButtonClose.addEventListener('click', closePopupProfileEdit); // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
popupProfileEditForm.addEventListener('submit', popupProfileEditFormSubmitHandler); // Прикрепить обработчик к форме редактирования профиля

popupCardAddButtonClose.addEventListener('click', closePopupCardAdd); // Прикрепить обработчик к кнопке закрытия попап добавления нового места
popupCardAddForm.addEventListener('submit', popupCardAddFormSubmitHandler); // Прикрепить обработчик к форме добавления нового места
