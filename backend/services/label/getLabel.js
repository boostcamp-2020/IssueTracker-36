const { label } = require('../../sequelize/models');

const getLabels = async (req, res) => {
  try {
    const labels = await label.findAll({});
    res.json({ labels });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
};

module.exports = getLabels;
