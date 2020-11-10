const { issue } = require('../../sequelize/models');

const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await issue.destroy({
      where: {
        id,
      },
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = deleteIssue;
