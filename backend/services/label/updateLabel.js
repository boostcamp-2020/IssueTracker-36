const { label } = require('../../sequelize/models');

const updateLabel = async (req, res) => {
  try {
    const { title, description, color } = req.body;
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    const colorRegex = /^#[0-9a-f]{6}$/i;
    if (!colorRegex.test(color)) throw new TypeError();
    if (Number.isNaN(parsedId) || parsedId < 1) throw new TypeError();

    const result = await label.update({ title, description, color }, { where: { id } });
    res.json(result);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = updateLabel;
