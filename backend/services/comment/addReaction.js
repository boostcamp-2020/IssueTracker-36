const { comment: Comment, reaction: Reaction } = require('../../sequelize/models');

const addReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) throw new TypeError();
    if (typeof type !== 'string') throw new TypeError();

    const createdReaction = await Reaction.create({
      userId: req.body.uid,
      commentId: comment.id,
      type,
    });

    res.json(createdReaction);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = addReaction;
