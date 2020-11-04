const { milestone } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await milestone.findOne({
      where: { id },
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};
