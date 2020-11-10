const { Op } = require('sequelize');
const { issue, milestone, user_issue, user, issue_label, label } = require('../../sequelize/models');

/**
 * @todo 필터 검색 로직 구현
 */
const getIssues = async (req, res) => {
  try {
    console.log(req.query);
    // const { page, count, closed } = req.query;
    // const { page, count } = req.query;
    // const parsedPage = parseInt(page, 10);
    // const parsedCount = parseInt(count, 10);
    // const parsedClosed = closed === 'true';

    // if (Number.isNaN(parsedPage) || parsedPage < 1) {
    //   return res.sendStatus(400);
    // }

    // if (Number.isNaN(parsedCount) || parsedCount < 1) {
    //   return res.sendStatus(400);
    // }

    // const limit = parsedCount;
    // const offset = limit * (parsedPage - 1);
    const issues = await issue.findAndCountAll({
      include: [
        {
          model: user_issue,
          required: true,
          where: {
            [Op.or]: [
              {
                user_id: {
                  [Op.eq]: req.query.author,
                },
                is_owner: 1,
              },
              {
                user_id: {
                  [Op.eq]: req.query.assignee,
                },
                is_owner: 0,
              },
            ],
          },
          include: [
            {
              model: user,
              attributes: ['nickName'],
            },
          ],
        },
      ],
      where: { milestone_id: req.query.milestone },
    });

    return res.json(issues);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

module.exports = getIssues;
