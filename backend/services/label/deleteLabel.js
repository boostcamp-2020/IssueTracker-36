const { label } = require('../../sequelize/models');

const deleteLabel = async (req, res) => {
  try {
    const deletedLabel = await label.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedLabel);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteLabel;
