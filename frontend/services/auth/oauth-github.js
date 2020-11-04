import apiRequest from '@utils/api-request';

const oauthGithub = async (code) => {
  const endpoint = '/api/auth/oauth/github';
  const {
    data: { token },
  } = await apiRequest.post(endpoint, { code });
  window.localStorage.setItem('userToken', token);
};

export default oauthGithub;
