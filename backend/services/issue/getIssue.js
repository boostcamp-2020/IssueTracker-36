const { issue, comment, reaction, user, user_issue: userIssue } = require('../../sequelize/models');

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
          include: [
            {
              model: user,
              attributes: ['nickName'],
            },
            reaction,
          ],
        },
        {
          model: userIssue,
          include: {
            model: user,
            attributes: ['nickName'],
          },
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
