let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let profileButtonEdit = document.querySelector('.profile__button_action_edit');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let popupButtonClose = popup.querySelector('.popup__button_action_close');
let popupFormName = popup.querySelector('.popup__input_field_name');
let popupFormJob = popup.querySelector('.popup__input_field_job');

// Функция открытия попап
function openPopup() {
  popup.classList.add('popup_opened');
  popupFormName.value = profileName.textContent;
  popupFormJob.value = profileJob.textContent;
  document.body.style.overflowY = 'hidden'; // Запретить вертикальный скролл
}

// Функция закрытия попап
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


profileButtonEdit.addEventListener('click', openPopup); // Прикрепить обработчик к кнопке редактирования профиля
popupButtonClose.addEventListener('click', closePopup); // Прикрепить обработчик к кнопке закрытия попап
popupForm.addEventListener('submit', popupFormSubmitHandler); // Прикрепить обработчик к форме


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

const elementTemplate = document.querySelector('#element').content;
const elementsGrid = document.querySelector('.elements__grid');

initialCards.forEach(function(item) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__img').src = item.link;
  element.querySelector('.element__heading').textContent = item.name;
  elementsGrid.append(element);
});
