const filenames = require('../utils/filenames');
const isAuth = require('../services/user/is-auth');

const apiPrefix = '/api';
module.exports = (app) => {
  const routes = filenames(__dirname);
  routes.forEach((route) => {
    app.use(`${apiPrefix}`, isAuth, require(`./${route}/index.js`));
  });
};
