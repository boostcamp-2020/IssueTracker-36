const { user_issue: userIssue } = require('../../sequelize/models');

const addIssueUser = async (req, res) => {
  try {
    const { issueId, userId } = req.params;
    const result = await userIssue.create({ issueId, userId, is_owner: 0 });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = addIssueUser;
