let profile = document.querySelector('.profile');
let profileButtonEdit = document.querySelector('.button_action_edit');

let popup = document.querySelector('.popup');
let popupButtonClose = popup.querySelector('.button_action_close');

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let popupNameInput = popup.querySelector('.popup__input_field_name');
let popupJobInput = popup.querySelector('.popup__input_field_job');

function openPopup() {
  popup.classList.add('popup_opened');
  popupNameInput.setAttribute('value', profileName.textContent);
  popupJobInput.setAttribute('value', profileJob.textContent);
  document.body.style.overflowY = 'hidden';
}

profileButtonEdit.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
  document.body.style.overflowY = 'auto';
}

popupButtonClose.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;

  profileJob.textContent = popupJobInput.value;

  closePopup();
}

let formElement = document.querySelector('.popup__container');

formElement.addEventListener('submit', formSubmitHandler);
