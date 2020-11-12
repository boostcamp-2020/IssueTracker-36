const { label } = require('../../sequelize/models');

const deleteLabels = async (req, res) => {
  try {
    const deletedLabel = await label.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedLabel);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteLabels;
