const { Op } = require('sequelize').Sequelize;
const { issue } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { issuesId, isClose } = req.body;
    if (!Array.isArray(issuesId) || typeof isClose !== 'boolean') return res.sendStatus(400);

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
    return res.json();
  } catch (err) {
    return res.sendStatus(500);
  }
};
