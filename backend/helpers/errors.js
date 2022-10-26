const invalidCode = 400;
const invalidEmailOrPasswordCode = 401;
const unauthorizedCode = 403;
const notFoundCode = 404;
const userExistsCode = 409;

//  400
const throwAlreadyLikedError = () => {
  const error = new Error('Already liked');
  error.name = 'AlreadyLiked';
  error.statusCode = invalidCode;
  error.message = 'Card already liked';
  throw error;
};

const throwAlreadyUnlikedError = () => {
  const error = new Error('Already unliked');
  error.name = 'AlreadyUnliked';
  error.statusCode = invalidCode;
  error.message = 'Card already unliked';
  throw error;
};

// 401
const throwEmailOrPasswordError = () => {
  const error = new Error('Wrong data');
  error.name = 'WrongEmailOrPassword';
  error.message = 'Incorrect email or password';
  error.statusCode = invalidEmailOrPasswordCode;
  throw error;
};

// 403
const throwAuthorizatiionError = () => {
  const error = new Error('Unauthorized');
  error.name = 'Unauthorized';
  error.statusCode = 403;
  error.message = 'Authorization requiered';
  throw error;
};

const throwNotOwnerError = () => {
  const error = new Error('Not the owner');
  error.name = 'NotOwner';
  error.statusCode = unauthorizedCode;
  error.message = 'You are not the owner of this Card';
  throw error;
};

//  404
const throwNotFoundError = () => {
  const error = new Error('Not found');
  error.name = 'NotFound';
  error.statusCode = notFoundCode;
  error.message = 'Requested resource not found.';
  throw error;
};

//  409
const throwAlreadyExistsError = () => {
  const error = new Error('User exists');
  error.name = 'UserExists';
  error.message = 'User already exists';
  error.statusCode = userExistsCode;
  throw error;
};

module.exports = {
  throwAlreadyLikedError,
  throwAlreadyUnlikedError,
  throwNotOwnerError,
  throwEmailOrPasswordError,
  throwAlreadyExistsError,
  throwNotFoundError,
  throwAuthorizatiionError,
};
