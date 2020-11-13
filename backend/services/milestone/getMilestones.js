const { milestone, issue } = require('../../sequelize/models');

module.exports = async (req, res) => {
  try {
    const milestones = await milestone.findAll({
      where: req.query,
    });
    const result = await milestones.reduce(async (promise, { dataValues: milestoneDataValue }) => {
      const acc = await promise.then();
      const issueMilestone = await issue.findAll({
        attributes: ['is_closed'],
        where: { milestone_id: milestoneDataValue.id },
      });
      const closedIssue = issueMilestone.filter(({ dataValues: issueDataValue }) => issueDataValue.is_closed);
      const milestoneData = {
        ...milestoneDataValue,
        closedIssueNumber: closedIssue.length,
        openedIssueNumber: issueMilestone.length - closedIssue.length,
      };
      acc.push(milestoneData);
      return Promise.resolve(acc);
    }, Promise.resolve([]));
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};
