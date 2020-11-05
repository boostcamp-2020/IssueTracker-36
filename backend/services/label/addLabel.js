const { label } = require('../../sequelize/models');

const addLabel = async (req, res) => {
  try {
    const generatedLabel = await label.create({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    res.json(generatedLabel);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = addLabel;
