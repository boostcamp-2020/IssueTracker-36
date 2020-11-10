const { label } = require('../../sequelize/models');

const deleteLabels = async (req, res) => {
  try {
    await label.destroy({
      where: { id: req.params.id },
    });
    res.json(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteLabels;
