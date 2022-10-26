const mongoose = require('mongoose');
const stringValidator = require('validator');
const bcrypt = require('bcryptjs');
const { throwEmailOrPasswordError } = require('../helpers/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return stringValidator.isEmail(v);
      },
      message: 'Invalid email value',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    required: true,
    validate: {
      validator(v) {
        return stringValidator.isURL(v);
      },
      message: 'Invalid url value',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  if (!stringValidator.isEmail(email)) {
    const error = new Error('Not email');
    error.statusCode = 400;
    error.message = 'Not valid email address';
    throw error;
  }
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throwEmailOrPasswordError();
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throwEmailOrPasswordError();
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
