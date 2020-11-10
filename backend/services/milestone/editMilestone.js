const { milestone: Milestone } = require('../../sequelize/models');

const editMilestone = async (req, res) => {
  try {
    const { title, dueDate, description, isClosed } = req.body;
    const milestone = await Milestone.findByPk(req.params.id);

    if (title && typeof title !== 'string') throw new TypeError();
    if (dueDate && typeof dueDate !== 'string') throw new TypeError();
    if (description && typeof description !== 'string') throw new TypeError();
    if (isClosed && typeof isClosed !== 'boolean') throw new TypeError();
    if (!milestone) throw new TypeError();

    const updatedMilestone = await milestone.update({ title, dueDate, description, isClosed });

    res.json(updatedMilestone);
  } catch (e) {
    if (e instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = editMilestone;
