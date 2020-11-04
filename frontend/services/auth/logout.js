import userInfo from '@utils/user-info';

const logout = () => {
  window.localStorage.removeItem('userToken');
  userInfo.logout();
};

export default logout;
