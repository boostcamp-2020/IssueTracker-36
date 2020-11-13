const { issue_label: issueLabel } = require('../../sequelize/models');

const deleteIssueLabel = async (req, res) => {
  try {
    const { issueId, labelId } = req.params;
    const result = await issueLabel.destroy({
      where: {
        issueId,
        labelId,
      },
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteIssueLabel;
