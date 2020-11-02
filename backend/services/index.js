const filenames = require('../utils/filenames');

const serviceNames = filenames(__dirname);

const serviceModule = {};

serviceNames.forEach((serviceName) => {
  serviceModule[serviceName] = require(`./${serviceName}`);
});
module.exports = serviceModule;

/**
const Comments = require('./Comments');
const Issues = require('./Issues');
const Labels = require('./Labels');
const Milestones = require('./Milestones');
const Users = require('./Users');

module.exprts = {
  Comments,
  Issues,
  Labels,
  Milestones,
  Users,
};
*/
