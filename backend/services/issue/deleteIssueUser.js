const { user_issue: userIssue } = require('../../sequelize/models');

const getIssue = async (req, res) => {
  try {
    const { issueId, userId } = req.params;
    const result = await userIssue.destroy({
      where: {
        issueId,
        userId,
      },
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = getIssue;
