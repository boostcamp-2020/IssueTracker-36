import apiRequest from '@utils/api-request';
import tokenStorage from '@utils/tokenStorage';

const oauthGithub = async (code) => {
  const endpoint = '/api/auth/oauth/github';
  const {
    data: { token },
  } = await apiRequest.post(endpoint, { code });
  tokenStorage.setToken(token);
};

export default oauthGithub;
