const tokenStorage = {
  getToken() {
    return window.localStorage.getItem('userToken');
  },
  clearToken() {
    window.localStorage.removeItem('userToken');
  },
  setToken(token) {
    window.localStorage.setItem('userToken', token);
  },
};

export default tokenStorage;
