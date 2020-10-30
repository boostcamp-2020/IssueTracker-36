const filenames = require('../utils/filenames');

const apiPrefix = '/api';
module.exports = (app) => {
  const routes = filenames(__dirname);
  routes.forEach((route) => {
    app.use(`${apiPrefix}`, require(`./${route}/index.js`));
  });
};
