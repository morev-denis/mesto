class UserInfo {
  constructor(profileName, profileJob) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  // Метод возврата объекта с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: '',
      job: ''
    }

    userInfo.name = this._profileName.textContent;
    userInfo.job = this._profileJob.textContent;

    return userInfo;
  }

  // Метод добавления новых данных пользователя
  setUserInfo(popupProfileEditFormName, popupProfileEditFormJob) {
    this._profileName.textContent = popupProfileEditFormName.value; // Присвоить Имени на HTML странице Имя из формы
    this._profileJob.textContent = popupProfileEditFormJob.value; // Присвоить О себе на HTML странице О себе из формы
  }
}

export {UserInfo};
