import isAuth from '@services/auth/is-auth';

class UserAuthenticate {
  constructor() {
    this.isPending = true;
    this.isAuthorized = false;
  }

  async checkUserAuth(setIsAuthorized, setIsPending) {
    try {
      if (!window.localStorage.getItem('userToken')) this.isAuthorized = false;
      else {
        const response = await isAuth();
        if (response.data.isAuthorized) this.isAuthorized = true;
        else this.isAuthorized = false;
      }
    } catch (err) {
      this.isAuthorized = true;
    } finally {
      this.isPending = false;
      setIsAuthorized(this.isAuthorized);
      setIsPending(this.isPending);
    }
  }

  login() {
    this.isAuthorized = true;
  }

  logout() {
    this.isAuthorized = false;
  }
}

export default new UserAuthenticate();
