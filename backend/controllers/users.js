require('dotenv').config()
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { createItem, updateItem } = require('../helpers/requestHandlers');
const {
  throwAlreadyExistsError,
  throwNotFoundError,
} = require('../helpers/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((value) => {
      if (!value) {
        throwNotFoundError();
      }
      res.send(value);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((item) => {
      if (!item) {
        throwNotFoundError();
      }
      res.send({ data: item });
    })
    .catch(next);
};

const getCurrrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throwNotFoundError();
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throwAlreadyExistsError();
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => createItem(
          req,
          res,
          User,
          { email: req.body.email, password: hash },
          false,
          next,
        ))
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  updateItem(
    req,
    res,
    User,
    req.user._id,
    { name: req.body.name, about: req.body.about },
    false,
    next,
  );
};

const updateAvatar = (req, res, next) => {
  updateItem(
    req,
    res,
    User,
    req.user._id,
    { avatar: req.body.avatar },
    false,
    next,
  );
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        //'90b40bed422117701b7310e020d6202b',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token: token });
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
  getCurrrentUser,
};
