const jwt = require('jsonwebtoken');
const { user } = require('../../sequelize/models');

module.exports = (req, res) => {
  user
    .findOrCreate({
      where: { local_id: req.data.id },
      defaults: { local_id: req.data.id, nickName: req.data.login, provider: 'GitHub' },
    })
    .then(([{ dataValues: userData }]) => {
      const { id, nickName, local_id, provider } = userData;
      const data = { localId: local_id, provider };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ token, id, nickName });
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
