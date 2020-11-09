const { user } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const result = await user.findAll({ attributes: ['id', 'nickName'] });
    const requestUserIndex = result.findIndex((row) => row.id === req.body.uid);
    result.splice(0, 0, result.splice(requestUserIndex, 1)[0]);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};
