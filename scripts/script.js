let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let profileButtonEdit = document.querySelector('.button_action_edit');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let popupButtonClose = popup.querySelector('.button_action_close');
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
