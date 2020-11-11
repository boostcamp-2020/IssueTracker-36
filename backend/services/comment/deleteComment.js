const { comment } = require('../../sequelize/models');

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (Number.isNaN(parseInt) || parsedId < 1) throw new TypeError();

    const result = await comment.destroy({
      where: {
        id,
      },
    });

    res.json(result);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = deleteComment;
