const { issue_label: issueLabel } = require('../../sequelize/models');

const addLabel = async (req, res) => {
  try {
    const { issueId, labelId } = req.params;
    const result = await issueLabel.create({ issueId, labelId });
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = addLabel;
