const axios = require('axios');

const getUser = async (req, res, next) => {
  try {
    const params = {
      code: req.body.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    };
    const getAccessToken = await axios.post('https://github.com/login/oauth/access_token', params, {
      headers: {
        accept: 'application/json',
      },
    });
    const accessToken = getAccessToken.data.access_token;
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    req.data = data;
    next();
  } catch (e) {
    res.sendStatus(500);
  }
};
module.exports = { getUser };
