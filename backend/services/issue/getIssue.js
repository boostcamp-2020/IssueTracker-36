const { issue, comment, reaction, user_issue } = require('../../sequelize/models');

const getIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await issue.findOne({
      where: {
        id,
      },
      include: [
        {
          model: comment,
          include: [reaction],
        },
        {
          model: user_issue,
        },
      ],
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = getIssue;
