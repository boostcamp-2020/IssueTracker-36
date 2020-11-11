const { comment } = require('../../sequelize/models');

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const result = await comment.update(
      {
        content,
      },
      {
        where: {
          id,
        },
      },
    );

    res.json(result);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = updateComment;
