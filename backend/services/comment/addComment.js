const { comment } = require('../../sequelize/models');

const addComment = async (req, res) => {
  try {
    const { isMain, content, issueId } = req.body;

    if (isMain && typeof isMain !== 'boolean') throw new TypeError();
    if (content && typeof content !== 'string') throw new TypeError();
    if (issueId && typeof issueId !== 'number') throw new TypeError();

    const newComment = await comment.create({ isMain, content, issueId });

    res.json(newComment);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = addComment;
