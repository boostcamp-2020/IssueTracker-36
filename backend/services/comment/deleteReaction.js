const { reaction: Reaction } = require('../../sequelize/models');

const deleteReaction = async (req, res) => {
  try {
    const { rid } = req.params;
    const reaction = await Reaction.findByPk(rid);

    if (!reaction) throw new TypeError();

    const deletedReaction = await reaction.destroy();

    res.json(deletedReaction);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = deleteReaction;
