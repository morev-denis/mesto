const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileButtonEdit = document.querySelector('.profile__button_action_edit');
const profileButtonAdd = document.querySelector('.profile__button_action_add');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__container');
const popupButtonClose = popup.querySelector('.popup__button_action_close');
const popupFormName = popup.querySelector('.popup__input_field_name');
const popupFormJob = popup.querySelector('.popup__input_field_job');

const popupAddCard = document.querySelector('.popup-add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup-add-card__container');
const popupAddCardButtonClose = popupAddCard.querySelector('.popup-add-card__button_action_close');
const popupAddCardFormName = popupAddCard.querySelector('.popup-add-card__input_field_name');
const popupAddCardFormLink = popupAddCard.querySelector('.popup-add-card__input_field_link');

const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

// Массив для вывода карточек при загрузке
const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: './images/elements/__element/elements__element_kirill-pershin-1088404-unsplash.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elements/__element/elements__element_kirill-pershin-1404681-unsplash.jpg'
  },
  {
    name: 'Домбай',
    link: './images/elements/__element/elements__element_kirill-pershin-1556355-unsplash.jpg'
  },
  {
    name: 'Псков',
    link: './images/elements/__element/elements__element_fortress-4490460_1280.jpg'
  },
  {
    name: 'Ярославль',
    link: './images/elements/__element/elements__element_river-2615647_1280.jpg'
  },
  {
    name: 'Рыбинск',
    link: './images/elements/__element/elements__element_rybinsk-887045_1280.jpg'
  }
];

// Функция открытия попап редактирования профиля
function openPopup() {
  popup.classList.add('popup_opened');
  popupFormName.value = profileName.textContent;
  popupFormJob.value = profileJob.textContent;
  document.body.style.overflowY = 'hidden'; // Запретить вертикальный скролл
}

// Функция закрытия попап редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
  document.body.style.overflowY = 'auto'; // Разрешить вертикалный скролл
}

// Функция изменения Имени и О себе через попап
function popupFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменить стандартную отправку формы
  profileName.textContent = popupFormName.value; // Присвоить Имени на HTML странице Имя из формы
  profileJob.textContent = popupFormJob.value;  // Присвоить О себе на HTML странице О себе из формы
  closePopup(); // Закрыть попап
}

// Функция открытия попап добавления нового места
function openPopupAddCard() {
  popupAddCard.classList.add('popup-add-card_opened');
  document.body.style.overflowY = 'hidden'; // Запретить вертикальный скролл
}

// Функция закрытия попап добавления нового места
function closePopupAddCard() {
  popupAddCard.classList.remove('popup-add-card_opened');
  document.body.style.overflowY = 'auto'; // Разрешить вертикалный скролл
}

// Функция добавления нового места
function popupAddCardFormSubmitHandler(evt) {
  const element = elementTemplate.cloneNode(true);
  evt.preventDefault(); // Отменить стандартную отправку формы
  element.querySelector('.element__img').src = popupAddCardFormLink.value;
  element.querySelector('.element__heading').textContent = popupAddCardFormName.value;
  elementsGrid.prepend(element);
  closePopupAddCard(); // Закрыть попап
  popupAddCardFormLink.value = ''; // Очистить поле ввода Ссылка на картинку
  popupAddCardFormName.value = ''; // Очистить поле ввода Название
}


// Вывод карточек из массива при загрузке
initialCards.forEach(function(item) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__img').src = item.link;
  element.querySelector('.element__heading').textContent = item.name;
  elementsGrid.append(element);
});


profileButtonEdit.addEventListener('click', openPopup); // Прикрепить обработчик к кнопке редактирования профиля
popupButtonClose.addEventListener('click', closePopup); // Прикрепить обработчик к кнопке закрытия попап редактирования профиля
popupForm.addEventListener('submit', popupFormSubmitHandler); // Прикрепить обработчик к форме редактирования профиля


profileButtonAdd.addEventListener('click', openPopupAddCard); // Прикрепить обработчик к кнопке добавления нового места
popupAddCardButtonClose.addEventListener('click', closePopupAddCard); // Прикрепить обработчик к кнопке закрытия попап добавления нового места
popupAddCardForm.addEventListener('submit', popupAddCardFormSubmitHandler); // Прикрепить обработчик к форме добавления нового места
