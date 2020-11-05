const { Op } = require('sequelize').Sequelize;
const { issue } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { issuesId, isClose } = req.body;
    if (!Array.isArray(issuesId) || typeof isClose !== 'boolean') throw new TypeError();

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
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};
