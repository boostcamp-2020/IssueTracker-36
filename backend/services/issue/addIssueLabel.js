const { issue_label: issueLabel } = require('../../sequelize/models');

const addLabel = async (req, res) => {
  try {
    const { issue_id: issueId, label_id: labelId } = req.params;
    const result = await issueLabel.create({ issueId, labelId });
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = addLabel;
