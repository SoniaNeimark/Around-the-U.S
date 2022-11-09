require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {
  createItem,
  updateItem,
  findItemById,
} = require('../helpers/requestHandlers');
const { throwAlreadyExistsError, notFoundError } = require('../helpers/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(notFoundError())
    .then((value) => {
      res.send(value);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  findItemById(req, res, next, User);
};

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throwAlreadyExistsError();
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => createItem(req, res, next, User, {
          email: req.body.email,
          password: hash,
        }))
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  updateItem(req, res, next, User, {
    name: req.body.name,
    about: req.body.about,
  });
};

const updateAvatar = (req, res, next) => {
  updateItem(req, res, next, User, { avatar: req.body.avatar });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
