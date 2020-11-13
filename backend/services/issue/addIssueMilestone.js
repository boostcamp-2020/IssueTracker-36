const { issue } = require('../../sequelize/models');

const addIssueMilestone = async (req, res) => {
  try {
    const { issueId, milestoneId } = req.params;
    const result = await issue.update({ milestoneId }, { where: { id: issueId } });

    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = addIssueMilestone;
