import Popup from './Popup.js'

const popupImageFullsize = document.querySelector('.popup_feat_image-fullsize');
const popupImageFullsizeImg = popupImageFullsize.querySelector('.popup__image-fullsize');
const popupImageFullsizeHeading = popupImageFullsize.querySelector('.popup__heading_feat_image-fullsize');
export default class PopupWithImage extends Popup {
  constructor(targetPopup) {
    super(targetPopup);
  }

  open(data) {
    popupImageFullsizeImg.src = data.placeLink;
    popupImageFullsizeImg.alt = data.placeName;
    popupImageFullsizeHeading.textContent = data.placeName;
    super.open();
  }
}
