class UserInfo {
  constructor() {
    this.authorized = !!window.localStorage.getItem('userToken');
    this.userName = false;
  }

  login() {
    this.authorized = true;
  }

  logout() {
    this.authorized = false;
  }
}

const userInfo = new UserInfo();
export default userInfo;
