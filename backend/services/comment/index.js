const filenames = require('../../utils/filenames');

const serviceNames = filenames(__dirname);

const serviceModule = {};

serviceNames.forEach((serviceName) => {
  serviceModule[serviceName] = require(`./${serviceName}`);
});

module.exports = serviceModule;
