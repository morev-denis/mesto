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
const profileButtonAvatar = document.querySelector('.profile__button_action_edit-avatar');
const profileButtonEdit = document.querySelector('.profile__button_action_edit');
const profileButtonAdd = document.querySelector('.profile__button_action_add');

const popupAvatarUpdate = document.querySelector('.popup_feat_avatar-update');
const popupAvatarUpdateButtonSubmit = popupAvatarUpdate.querySelector(
  '.popup__button_action_submit',
);
const popupAvatarUpdateForm = popupAvatarUpdate.querySelector(
  '.popup__container_feat_avatar-update',
);

const popupProfileEdit = document.querySelector('.popup_feat_profile-edit');
const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container_feat_profile-edit');
const popupProfileEditFormName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileEditFormJob = popupProfileEdit.querySelector('.popup__input_field_job');
const popupProfileEditButtonSubmit = popupProfileEditForm.querySelector(
  '.popup__button_action_submit',
);

const popupCardAdd = document.querySelector('.popup_feat_card-add');
const popupCardDelete = document.querySelector('.popup_feat_card-delete');
const popupCardAddForm = popupCardAdd.querySelector('.popup__container_feat_card-add');
const popupCardAddButtonSubmit = popupCardAddForm.querySelector('.popup__button_action_submit');
const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

const profileEditFormValidator = new FormValidator(validationConfig, popupProfileEditForm);
const cardAddFormValidator = new FormValidator(validationConfig, popupCardAddForm);
const avatarUpdateFormValidator = new FormValidator(validationConfig, popupAvatarUpdateForm);
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);
const popupWithImage = new PopupWithImage(popupImageFullsize);

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '6d1b76d0-8a79-4ce2-87f0-35c2e1868bd2',
    'Content-Type': 'application/json',
  },
});

let ownerId = {};
let evtCard = {};

const popupWithSubmit = new PopupWithSubmit(popupCardDelete, {
  clickButtonHandler: (data) => {
    api
      .deleteCard(data)
      .then(() => {
        evtCard.target.closest('.element').remove();
        popupWithSubmit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const createNewCard = (data) => {
  const card = new Card(data, elementTemplate, ownerId, {
    handleCardClick: (placeLink, placeName) => {
      popupWithImage.open({ placeLink, placeName });
    },
    handleCardDelete: (evt) => {
      evtCard = evt;
      popupWithSubmit.open(data);
    },
    setLike: (data) => {
      api
        .setLike(data)
        .then((data) => {
          card.renderLikeNum(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unsetLike: () => {
      api
        .unsetLike(data)
        .then((data) => {
          card.renderLikeNum(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card;
};

const cardSection = new Section(
  {
    renderer: (item) => {
      const card = createNewCard(item, elementTemplate);
      const cardElement = card.createCard();
      cardSection.addItem(cardElement);
    },
  },
  elementsGrid,
);

const popupWithFormAvatar = new PopupWithForm(popupAvatarUpdate, {
  submit: (data) => {
    popupWithFormAvatar.renderSubmitProgress('Сохранение...');
    userInfo.setUserAvatar(data);
    api
      .updateAvatar({ avatar: data.avatar })
      .then(() => {
        popupWithFormAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAvatar.renderSubmitProgress('Сохранить');
      });
  },
});

const popupWithFormProfile = new PopupWithForm(popupProfileEdit, {
  submit: (data) => {
    popupWithFormProfile.renderSubmitProgress('Сохранение...');
    userInfo.setUserInfo(data);
    api
      .setUserInfo({ name: data.profileName, about: data.profileJob })
      .then(() => {
        popupWithFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormProfile.renderSubmitProgress('Сохранить');
      });
  },
});

const popupWithFormAdd = new PopupWithForm(popupCardAdd, {
  submit: (item) => {
    popupWithFormAdd.renderSubmitProgress('Сохранение...');
    api
      .addCard({ name: item.name, link: item.link })
      .then((data) => {
        const card = createNewCard(data, elementTemplate);
        const cardElement = card.createCard(); // Получить разметку карточки
        cardSection.addItem(cardElement); // Вставить разметку карточки в контейнер
        popupWithFormAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAdd.renderSubmitProgress('Создать');
      });
  },
});

// Функция открытия попапа редактирования профиля
const openProfileEditHandler = () => {
  popupProfileEditButtonSubmit.classList.add(validationConfig.inactiveButtonClass); // Заблокировать кнопку сохранения

  const userData = userInfo.getUserInfo();
  popupProfileEditFormName.value = userData.name;
  popupProfileEditFormJob.value = userData.job;

  popupWithFormProfile.open(); // Открыть попап редактирования профиля
};

// Функция открытия попапа добавления нового места
const openCardAddHandler = () => {
  cardAddFormValidator.disableButton(popupCardAddButtonSubmit); // Заблокировать кнопку создания
  popupWithFormAdd.open(); // Открыть попап добавления нового места
};

// Функция открытия попапа редактирования аватара
const openAvatarUpdateHandler = () => {
  cardAddFormValidator.disableButton(popupAvatarUpdateButtonSubmit); // Заблокировать кнопку сохранения
  popupWithFormAvatar.open(); // Открыть попап редактирования аватара
};

// Установить данные профиля и вывести карточки с сервера
api
  .initData()
  .then((data) => {
    const [initialCards, userInfo] = data;
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    ownerId = userInfo._id;

    cardSection.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

profileEditFormValidator.enableValidation(); // Включить валидацию формы редактирования профиля
cardAddFormValidator.enableValidation(); // Включить валидацию формы добавления нового места
avatarUpdateFormValidator.enableValidation(); // Включить валидацию формы \обновления аватара

popupWithFormProfile.setEventListeners(); // Установить слушатели на попап редактирования профиля
popupWithFormAvatar.setEventListeners(); // Установить слушатели на попап редактирования аватара
popupWithFormAdd.setEventListeners(); // Установить слушатели на попап добавления нового места
popupWithImage.setEventListeners(); // Установить слушатели на попап с полноразмерной картинкой
popupWithSubmit.setEventListeners(); // Установить слушатели на попап подтверждения удаления

profileButtonEdit.addEventListener('click', () => {
  // Прикрепить обработчик к кнопке редактирования профиля
  openProfileEditHandler();
});
profileButtonAdd.addEventListener('click', () => {
  // Прикрепить обработчик к кнопке добавления нового места
  openCardAddHandler();
});
profileButtonAvatar.addEventListener('click', () => {
  // Прикрепить обработчик к кнопке аватара
  openAvatarUpdateHandler();
});
