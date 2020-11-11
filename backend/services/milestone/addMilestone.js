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
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};
