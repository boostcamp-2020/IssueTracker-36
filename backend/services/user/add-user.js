const { user } = require('../../sequelize/models');

module.exports = (req, res) => {
  user
    .findOrCreate({
      where: { local_id: req.data.id },
      defaults: { local_id: req.data.id, nickName: req.data.login, provider: 'GitHub' },
    })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
