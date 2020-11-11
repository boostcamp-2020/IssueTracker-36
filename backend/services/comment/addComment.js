const { comment } = require('../../sequelize/models');

const addComment = async (req, res) => {
  try {
    const { content, issueId } = req.body;

    if (content && typeof content !== 'string') throw new TypeError();
    if (issueId && typeof issueId !== 'number') throw new TypeError();

    const newComment = await comment.create({ user_id: req.body.uid, isMain: false, content, issueId });

    res.json(newComment);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = addComment;
