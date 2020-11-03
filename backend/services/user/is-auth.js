const jwt = require('jsonwebtoken');
const { user } = require('../../sequelize/models');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const loginUrl = '/api/auth/oauth/github';
    if (token === 'null' && req.originalUrl === loginUrl) return next();
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await user.findOne({ where: { local_id: decoded.localId, provider: decoded.provider } });
    if (!result) return res.sendStatus(401);
    req.body.uid = result.id;
    return next();
  } catch (e) {
    res.sendStatus(500);
  }
};
