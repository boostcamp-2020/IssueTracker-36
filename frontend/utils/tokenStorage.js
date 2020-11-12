const tokenStorage = {
  getToken() {
    return window.localStorage.getItem('userToken');
  },
  setToken(token) {
    window.localStorage.setItem('userToken', token);
  },
  clearToken() {
    window.localStorage.removeItem('userToken');
  },
  setUser(user) {
    window.localStorage.setItem('36_user', JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(window.localStorage.getItem('36_user'));
  },
  clearUser() {
    window.localStorage.removeItem('36_user');
  },
};

export default tokenStorage;
