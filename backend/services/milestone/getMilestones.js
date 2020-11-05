const { milestone } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const result = await milestone.findAll({
      where: req.query,
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};
