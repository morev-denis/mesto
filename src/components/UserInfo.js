export default class UserInfo {
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
  setUserInfo(data) {
    this._profileName.textContent = data.profileName; // Присвоить Имени на HTML странице Имя из формы
    this._profileJob.textContent = data.profileJob; // Присвоить О себе на HTML странице О себе из формы
  }
}
