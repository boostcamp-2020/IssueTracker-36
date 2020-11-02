require('dotenv').config();

const axios = require('axios');

const getUser = async (req, res, next) => {
  try {
    const params = {
      code: req.body.code,
      client_id: process.env.GITHUB_CLIENT_ID_DEV,
      client_secret: process.env.GITHUB_CLIENT_SECRET_DEV,
    };
    const getAccessToken = await axios.post('https://github.com/login/oauth/access_token', params);
    const accessToken = getAccessToken.data.split('&')[0].split('=')[1];
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    req.data = data;
    next();
  } catch (e) {
    res.json({ ok: false });
  }
};
module.exports = { getUser };
