import axios from 'axios';

const oauthGithub = async (code) => {
  const endpoint = 'http://localhost:3000/api/auth/oauth/github';
  const {
    data: { token },
  } = await axios.post(endpoint, { code });
  window.localStorage.setItem('userToken', token);
};

export default oauthGithub;
