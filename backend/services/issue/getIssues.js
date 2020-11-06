const { issue, milestone, user_issue, user, issue_label, label } = require('../../sequelize/models');

/**
 * @todo 필터 검색 로직 구현
 */
const getIssues = async (req, res) => {
  try {
    const { page, count, closed } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedCount = parseInt(count, 10);
    const parsedClosed = closed === 'true';

    if (Number.isNaN(parsedPage) || parsedPage < 1) {
      return res.sendStatus(400);
    }

    if (Number.isNaN(parsedCount) || parsedCount < 1) {
      return res.sendStatus(400);
    }

    const limit = parsedCount;
    const offset = limit * (parsedPage - 1);
    const issues = await issue.findAndCountAll({
      limit,
      offset,
      where: {
        isClosed: parsedClosed,
      },
      include: [
        {
          model: milestone,
          attributes: ['title'],
        },
        {
          model: user_issue,
          attributes: ['id'],
          include: {
            model: user,
            attributes: ['nickName'],
          },
        },
        {
          model: issue_label,
          attributes: ['id'],
          raw: true,
          include: {
            model: label,
            attributes: ['title', 'color'],
          },
        },
      ],
      order: [['id', 'DESC']],
    });

    return res.json(issues);
  } catch (e) {
    return res.sendStatus(500);
  }
};

module.exports = getIssues;
