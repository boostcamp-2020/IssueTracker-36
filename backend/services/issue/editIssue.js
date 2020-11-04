const { issue: Issue } = require('../../sequelize/models');

const editIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, closed } = req.body;

    if (title !== undefined && typeof title !== 'string') {
      return res.sendStatus(400);
    }
    if (closed !== undefined && typeof closed !== 'boolean') {
      return res.sendStatus(400);
    }

    const issue = await Issue.findByPk(id);

    if (!issue) {
      return res.sendStatus(400);
    }

    await issue.update({ title, isClosed: closed });
    const updatedIssue = await await Issue.findByPk(id);

    return res.json({ updatedIssue });
  } catch (e) {
    return res.sendStatus(500);
  }
};

module.exports = editIssue;
