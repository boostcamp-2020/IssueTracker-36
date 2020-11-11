const { Op } = require('sequelize').Sequelize;
const { issue } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const { issuesId, isClosed } = req.body;
    if (!Array.isArray(issuesId) || typeof isClosed !== 'boolean') throw new TypeError();

    await issue.update(
      { isClosed },
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
