const jwt = require('jsonwebtoken');
const { user } = require('../../sequelize/models');

module.exports = (req, res) => {
  user
    .findOrCreate({
      where: { local_id: req.data.id },
      defaults: {
        local_id: req.data.id,
        nickName: req.data.login,
        provider: 'GitHub',
        img_url: req.data.avatar_url,
      },
    })
    .then(([{ dataValues: userData }]) => {
      console.log(userData);
      const { id, nickName, local_id, provider, img_url } = userData;
      const data = { localId: local_id, provider, img_url };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      console.log(img_url);
      res.json({ token, id, nickName, img_url });
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
