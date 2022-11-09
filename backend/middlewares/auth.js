require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { throwAuthorizatiionError } = require('../helpers/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throwAuthorizatiionError();
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(
    token,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  );
  if (!payload) {
    throwAuthorizatiionError();
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
