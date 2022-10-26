const jwt = require('jsonwebtoken');
const { throwAuthorizatiionError } = require('../helpers/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throwAuthorizatiionError();
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, '90b40bed422117701b7310e020d6202b');
  if (!payload) {
    throwAuthorizatiionError();
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
