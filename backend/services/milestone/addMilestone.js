const { milestone } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { title, dueDate, description } = req.body;
    const result = await milestone.create({
      title,
      dueDate: dueDate || undefined,
      description,
      isClosed: false,
    });
    result.dataValues.closedIssueNumber = 0;
    result.dataValues.openedIssueNumber = 0;
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};
