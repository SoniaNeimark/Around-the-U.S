const {
  findItemById,
  createItem,
  deleteItem,
  updateItem,
  testIfOwner,
} = require('../helpers/requestHandlers');
const { notFoundError, throwNotOwnerError } = require('../helpers/errors');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(notFoundError())
    .then((value) => {
      res.send(value);
    })
    .catch(next);
};

const getCardById = (req, res, next) => {
  findItemById(req, res, next, Card);
};

const createCard = (req, res, next) => {
  createItem(req, res, next, Card, {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  });
};

const updateCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(notFoundError())
    .then((item) => {
      if (testIfOwner(req, item)) {
        updateItem(req, res, next, Card, {
          name: req.body.name,
          link: req.body.link,
        });
        return;
      }
      throwNotOwnerError();
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(notFoundError())
    .then((item) => {
      if (!item.likes.includes(req.user._id)) {
        updateItem(req, res, next, Card, {
          $addToSet: { likes: req.user._id },
        });
        return;
      }
      res.send(item);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(notFoundError())
    .then((item) => {
      if (item.likes.includes(req.user._id)) {
        updateItem(req, res, next, Card, {
          $pull: { likes: `${req.user._id}` },
        });
        return;
      }
      res.send(item);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  deleteItem(req, res, Card, next);
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
  updateCard,
};
