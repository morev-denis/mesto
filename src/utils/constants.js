export const root = document.querySelector('.root');

export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileJob = profile.querySelector('.profile__job');
export const profileButtonEdit = document.querySelector('.profile__button_action_edit');
export const profileButtonAdd = document.querySelector('.profile__button_action_add');

export const popupProfileEdit = document.querySelector('.popup_feat_profile-edit');
export const popupProfileEditForm = popupProfileEdit.querySelector('.popup__container_feat_profile-edit');
export const popupProfileEditButtonClose = popupProfileEdit.querySelector('.popup__button_action_close');
export const popupProfileEditFormName = popupProfileEdit.querySelector('.popup__input_field_name');
export const popupProfileEditFormJob = popupProfileEdit.querySelector('.popup__input_field_job');
export const popupProfileEditButtonSubmit = popupProfileEditForm.querySelector('.popup__button_action_submit');

export const popupCardAdd = document.querySelector('.popup_feat_card-add');
export const popupCardAddForm = popupCardAdd.querySelector('.popup__container_feat_card-add');
export const popupCardAddButtonClose = popupCardAdd.querySelector('.popup__button_action_close');
export const popupCardAddFormName = popupCardAdd.querySelector('.popup__input_field_place');
export const popupCardAddFormLink = popupCardAdd.querySelector('.popup__input_field_link');
export const popupCardAddButtonSubmit = popupCardAddForm.querySelector('.popup__button_action_submit');

export const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
export const popupImageFullsizeImg = popupImageFullsize.querySelector('.popup__image-fullsize');
export const popupImageFullsizeHeading = popupImageFullsize.querySelector('.popup__heading_feat_image-fullsize');
export const popupImageFullsizeButtonClose = popupImageFullsize.querySelector('.popup__button_action_close');

export const elementTemplate = document.querySelector('#element').content; // Шаблон карточки
export const elementsGrid = document.querySelector('.elements__grid'); // Список для вставки карточек

export const popupFormSelector = '.popup__container_form';
export const popupFormInputSelector = '.popup__input';
export const popupButtonClose = '.popup__button_action_close';
