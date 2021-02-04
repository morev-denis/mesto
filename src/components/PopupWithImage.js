import Popup from './Popup.js'
import { popupImageFullsizeImg, popupImageFullsizeHeading } from '../utils/constants.js';

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
