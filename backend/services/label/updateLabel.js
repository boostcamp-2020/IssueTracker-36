const { label: Label } = require('../../sequelize/models');

const updateLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, color } = req.body;
    const colorRegex = /^#[0-9a-f]{6}$/i;

    const label = await Label.findByPk(id);

    if (!label) throw new TypeError();
    if (!colorRegex.test(color)) throw new TypeError();
    if (typeof title !== 'string' || !title) throw new TypeError();

    const updatedLabel = await label.update({ title, description, color }, { returning: true });

    res.json(updatedLabel);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = updateLabel;
