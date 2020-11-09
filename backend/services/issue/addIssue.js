const { sequelize, issue, comment, user_issue, issue_label } = require('../../sequelize/models');

module.exports = async (req, res) => {
  const { uid, title, content, assigneeIds, labelIds, milestoneId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    // 이슈등록
    const createdIssue = await issue.create(
      {
        title,
        isClosed: 0,
        milestoneId,
      },
      { transaction },
    );

    //   라벨 등록
    const labelDatas = labelIds.map((id) => {
      return {
        issueId: createdIssue.id,
        labelId: id,
      };
    });

    await issue_label.bulkCreate(labelDatas, { transaction });

    //  댓글 등록
    await comment.create(
      {
        content,
        isMain: 1,
        isClosed: 0,
        issueId: createdIssue.id,
        userId: uid,
      },
      { transaction },
    );

    //  assignee 등록

    const assigneeDatas = assigneeIds.map((id) => {
      return {
        issueId: createdIssue.id,
        userId: id,
        is_owner: 0,
      };
    });

    assigneeDatas.push({
      issueId: createdIssue.id,
      userId: uid,
      is_owner: 1,
    });

    await user_issue.bulkCreate(assigneeDatas, { transaction });

    await transaction.commit();
    res.sendStatus(200);
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.log(err);
    res.sendStatus(500);
  }
};
