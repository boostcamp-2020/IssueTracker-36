const { user } = require('../../sequelize/models');

module.exports = (req, res) => {
  user
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
