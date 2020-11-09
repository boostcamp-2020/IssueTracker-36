const { user_issue } = require('../../sequelize/models');

const addLabel = async (req, res) => {
  try {
    const { issue_id: issueId, user_id: userId } = req.params;
    const result = await user_issue.create({ issueId, userId, is_owner: 0 });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = addLabel;
