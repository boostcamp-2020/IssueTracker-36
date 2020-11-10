const { milestone } = require('../../sequelize/models');

const deleteMilestone = async (req, res) => {
  try {
    const deletedMilestone = await milestone.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedMilestone);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteMilestone;
