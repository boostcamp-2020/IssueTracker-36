const {
  issue,
  comment,
  reaction,
  user,
  user_issue: userIssue,
  issue_label: issueLabel,
} = require('../../sequelize/models');

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
              attributes: ['nickName', 'img_url'],
            },
            reaction,
          ],
        },
        {
          model: userIssue,
          attributes: ['is_owner'],
          include: {
            model: user,
            attributes: ['id', 'nickName'],
          },
        },
        {
          model: issueLabel,
          attributes: ['label_id'],
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
