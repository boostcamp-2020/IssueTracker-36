const { sequelize, issue, comment, user_issue, issue_label } = require('../../sequelize/models');

module.exports = async (req, res) => {
  const { uid, title, content, assigneeIds, labelIds, milestoneId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    // 이슈등록
    const creaatedIssue = await issue.create(
      {
        title,
        isClosed: 0,
        milestoneId,
      },
      { transaction },
    );

    //   라벨 등록
    const labelDatas = [];
    labelIds.forEach((id) => {
      const obj = {
        issueId: creaatedIssue.id,
        labelId: id,
      };

      labelDatas.push(obj);
    });

    await issue_label.bulkCreate(labelDatas, { transaction });

    //  댓글 등록
    await comment.create(
      {
        content,
        isMain: 1,
        isClosed: 0,
        issueId: creaatedIssue.id,
        userId: uid,
      },
      { transaction },
    );

    //  assignee 등록
    const asigneeDatas = [
      {
        issueId: creaatedIssue.id,
        userId: uid,
        is_owner: 1,
      },
    ];

    assigneeIds.forEach((id) => {
      const obj = {
        issueId: creaatedIssue.id,
        userId: id,
        is_owner: 0,
      };
      asigneeDatas.push(obj);
    });

    await user_issue.bulkCreate(asigneeDatas, { transaction });

    await transaction.commit();
    res.sendStatus(200);
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.log(err);
    res.sendStatus(500);
  }
};
