import axios from 'axios';

const oauthGithub = async (code) => {
  const endpoint = 'http://localhost:3000/auth/oauth/github';
  const response = await axios.post(endpoint, { code });
  return response;
};

export default oauthGithub;
