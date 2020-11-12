const { issue } = require('../../sequelize/models');

const deleteIssueMilestone = async (req, res) => {
  try {
    const { issueId } = req.params;
    const result = await issue.update({ milestoneId: null }, { where: { id: issueId } });
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = deleteIssueMilestone;
