const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const string = Joi.string().required().min(2).max(30);
const url = Joi.string().required().custom(validateURL);
const password = Joi.string().required().min(8);
const email = Joi.string().email().required();

//  headers
const headersObjKeys = {
  authorization: Joi.string()
    .required()
    .regex(/(Bearer)\s{1}(a-zA-Z0-9)+/),
};

const headersValidation = {
  headers: Joi.object().keys(headersObjKeys).unknown(true),
};

//  params
const paramsObjKeys = {
  id: Joi.string().alphanum().length(24),
};

const paramsValidation = {
  params: Joi.object().keys(paramsObjKeys),
};

//  card body
const cardBodyObjKeys = {
  link: url,
  name: string,
};

const cardBodyValidation = {
  body: Joi.object().keys(cardBodyObjKeys),
};

//  user body
const userBodyObjKeys = {
  name: string,
  about: string,
};

const userBodyValidation = {
  body: Joi.object().keys(userBodyObjKeys),
};

const userCredentialsBodyObjKeys = {
  email,
  password,
};

const userCredentialsBodyValidation = {
  body: Joi.object().keys(userCredentialsBodyObjKeys),
};

//  avatar body
const avatarBodyObjKeys = {
  avatar: url,
};

const avatarBodyValidation = {
  body: Joi.object().keys(avatarBodyObjKeys),
};

const validateRequest = (validationObj) => celebrate(validationObj);

module.exports = {
  cardBodyValidation,
  headersValidation,
  paramsValidation,
  userBodyValidation,
  avatarBodyValidation,
  userCredentialsBodyValidation,
  validateRequest,
};
