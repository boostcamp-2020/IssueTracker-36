import apiRequest from '@utils/api-request';
import tokenStorage from '@utils/tokenStorage';

const oauthGithub = async (code) => {
  const endpoint = '/api/auth/oauth/github';
  const {
    data: { token, id, nickName, img_url },
  } = await apiRequest.post(endpoint, { code });

  tokenStorage.setToken(token);
  tokenStorage.setUser({ id, nickName, img_url });

  return { token, id, nickName, img_url };
};

export default oauthGithub;
