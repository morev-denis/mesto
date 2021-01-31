import Popup from './Popup.js'
import { popupImageFullsize, popupImageFullsizeImg, popupImageFullsizeHeading } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(targetPopup) {
    super(targetPopup);
  }

  open(data) {
    popupImageFullsizeImg.src = data.link;
    popupImageFullsizeImg.alt = data.name;
    popupImageFullsizeHeading.textContent = data.name;
    super.open();
  }
}
