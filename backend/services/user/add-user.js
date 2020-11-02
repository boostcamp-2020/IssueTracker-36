const { user } = require('../../sequelize/models');

module.exports = (req, res) => {
  try {
    user
      .create({ local_id: req.data.id, nickName: req.data.login, provider: 'GitHub' })
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (e) {
    res.json({ ok: false });
  }
};
