const sequelize = require('sequelize');
const {
  issue: Issue,
  milestone: Milestone,
  user_issue: UserIssue,
  user: User,
  issue_label: IssueLabel,
  label: Label,
  comment: Comment,
} = require('../../sequelize/models');

const { Op } = sequelize;

const getIssues = async (req, res) => {
  try {
    const { page, count, isClosed, milestone, author, assignee, comment } = req.query;
    let { label } = req.query;
    const parsed = {
      page: (page && parseInt(page, 10)) || 1,
      count: (count && parseInt(count, 10)) || 20,
      milestone: milestone && parseInt(milestone, 10),
      author: author && parseInt(author, 10),
      assignee: assignee && parseInt(assignee, 10),
      comment: comment && parseInt(comment, 10),
    };

    if (
      !Object.values(parsed).every(
        (parsedNumber) => (!Number.isNaN(parsedNumber) && parsedNumber > 0) || parsedNumber === undefined,
      )
    )
      throw new TypeError();

    const offset = parsed.count * (parsed.page - 1);
    const where = {};
    const userWhere = {};

    switch (isClosed) {
      case undefined:
      case 'false':
        where.isClosed = false;
        break;
      case 'true':
        where.isClosed = true;
        break;
      case 'none':
        break;
      default:
        throw new TypeError();
    }

    if (parsed.author) {
      userWhere.user_id = parsed.author;
      userWhere.is_owner = 1;
    }
    if (parsed.assignee) {
      const userIssues = await UserIssue.findAll({
        attributes: ['issue_id'],
        where: {
          user_id: parsed.assignee,
          is_owner: 0,
        },
      });
      const possibleIssues = userIssues.reduce((acc, userIssue) => {
        acc.push(userIssue.dataValues.issue_id);
        return acc;
      }, []);
      where.id = { [Op.in]: possibleIssues };
    }

    if (parsed.milestone) where.milestone_id = milestone;
    if (label) {
      if (typeof label === 'string') {
        label = [label];
      }
      label.forEach((labelId) => {
        const parsedLabelId = parseInt(labelId, 10);
        if (Number.isNaN(parsedLabelId) || parsedLabelId < 1) throw new TypeError();
      });
      const issue = await IssueLabel.findAll({
        attributes: [
          'issue_id',
          'label_id',
          [sequelize.fn('GROUP_CONCAT', sequelize.col('label_id')), 'label_id'],
        ],
        group: ['issue_id'],
      });
      const possibleIssues = issue.reduce((acc, possibleIssue) => {
        const issueLabel = possibleIssue.dataValues.label_id.split(',');
        if (label.every((checkingLabel) => issueLabel.includes(checkingLabel)))
          acc.push(possibleIssue.dataValues.issue_id);
        return acc;
      }, []);
      where.id = where.id
        ? { [Op.in]: where.id[Op.in].filter((id) => possibleIssues.includes(id)) }
        : { [Op.in]: possibleIssues };
    }
    let commentInclude = {};
    if (parsed.comment) {
      commentInclude = {
        model: Comment,
        required: true,
        where: { id: parsed.comment },
      };
    }
    const issues = await Issue.findAndCountAll({
      limit: parsed.count,
      offset,
      where,
      include: [
        {
          model: UserIssue,
          required: true,
          attributes: ['is_owner'],
          where: userWhere,
          include: [
            {
              model: User,
              attributes: ['nickName'],
            },
          ],
        },
        {
          model: IssueLabel,
          attributes: ['id'],
          include: [
            {
              model: Label,
              attributes: ['title', 'color'],
            },
          ],
        },
        {
          model: Milestone,
          attributes: ['title'],
        },
        {
          model: Comment,
          required: true,
          where: parsed.comment ? { user_id: parsed.comment } : null,
        },
      ],
      order: [['id', 'DESC']],
    });

    res.json(issues);
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = getIssues;
