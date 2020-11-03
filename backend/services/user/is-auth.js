const jwt = require('jsonwebtoken');
const { user } = require('../../sequelize/models');

module.exports = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const tokenNotExist = token === 'null';
    const { originalUrl } = req;
    const isUrlWithoutAuth = originalUrl.startsWith('/api/auth') || originalUrl === '/api/user';
    if (tokenNotExist && isUrlWithoutAuth) return next();
    if (tokenNotExist) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await user.findOne({ where: { local_id: decoded.localId, provider: decoded.provider } });
    if (!result) return res.sendStatus(401);
    req.body.uid = result.id;
    return next();
  } catch (e) {
    return res.sendStatus(500);
  }
};
