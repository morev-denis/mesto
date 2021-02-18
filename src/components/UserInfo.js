export default class UserInfo {
  constructor(profileName, profileJob, userAvatar) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._userAvatar = userAvatar;
  }

  // Метод возврата объекта с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }

    return userInfo;
  }

  // Метод добавления нового аватара пользователя
  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

  // Метод добавления новых данных пользователя
  setUserInfo(data) {
    this._profileName.textContent = data.profileName; // Присвоить Имени на HTML странице Имя из формы
    this._profileJob.textContent = data.profileJob; // Присвоить О себе на HTML странице О себе из формы
  }
}
