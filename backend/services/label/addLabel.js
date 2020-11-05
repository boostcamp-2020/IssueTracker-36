const { label } = require('../../sequelize/models');

const addLabel = async (req, res) => {
  try {
    const { title, description, color } = req.body;
    const colorRegex = /^#[0-9a-f]{6}$/i;
    if (!colorRegex.test(color)) throw new TypeError();

    const generatedLabel = await label.create({ title, description, color });
    res.json(generatedLabel);
  } catch (err) {
    if (err instanceof TypeError) res.sendStatus(400);
    else res.sendStatus(500);
  }
};

module.exports = addLabel;
