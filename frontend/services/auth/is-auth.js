import axios from 'axios';

const isAuth = async () => {
  const endpoint = 'http://localhost:3000/auth/is-auth';
  const response = await axios.post(endpoint);
  return response;
};

export default isAuth;
