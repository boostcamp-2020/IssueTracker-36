const { label } = require('../../sequelize/models');

const getLabels = async (req, res) => {
  try {
    const labels = await label.findAll({});
    res.json(labels);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = getLabels;
