const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const getToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Нужна авторизация');
  }

  const token = getToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new Unauthorized('Нужна авторизация');
  }
  req.user = payload;
  next();
};
