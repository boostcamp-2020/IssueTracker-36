const { Op } = require('sequelize').Sequelize;
const { issue } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { issuesId, isClose } = req.body;
    await issue.update(
      { isClosed: isClose },
      {
        where: {
          id: {
            [Op.in]: issuesId,
          },
        },
      },
    );
    res.json();
  } catch (err) {
    res.sendStatus(500);
  }
};
