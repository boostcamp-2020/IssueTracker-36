const { issue } = require('../../sequelize/models');

/**
 * @todo 하나의 issue 데이터 받아오는 로직 구현
 */
const getIssue = async (req, res) => {
  try {
    const issues = await issue.findAll();
    res.json({ issues });
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = getIssue;
