const {
  createItem,
  deleteItem,
  updateItem,
} = require('../helpers/requestHandlers');
const {
  throwAlreadyUnlikedError,
  throwAlreadyLikedError,
  throwNotFoundError,
} = require('../helpers/errors');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((value) => {
      if (!value) {
        throwNotFoundError();
      }
      res.send(value);
    })
    .catch(next);
};

const getCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((item) => {
      if (!item) {
        throwNotFoundError();
      }
      res.send({ data: item });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  createItem(
    req,
    res,
    Card,
    { name: req.body.name, link: req.body.link, owner: req.user._id },
    true,
    next,
  );
};

const updateCard = (req, res, next) => {
  updateItem(
    req,
    res,
    Card,
    req.params.id,
    { name: req.body.name, link: req.body.link },
    false,
    next,
  );
};

const addLike = (req, res, next) => {
  Card.findById(req.params.id)
    .then((item) => {
      if (item) {
        if (!item.likes.includes(req.user._id)) {
          updateItem(
            req,
            res,
            Card,
            req.params.id,
            {
              $addToSet: { likes: req.user._id },
            },
            true,
            next,
          );
        } else {
          throwAlreadyLikedError();
        }
      }
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findById(req.params.id)
    .then((item) => {
      if (item) {
        if (!item.likes.includes(req.user._id)) {
          throwAlreadyUnlikedError();
        } else {
          updateItem(
            req,
            res,
            Card,
            req.params.id,
            {
              $pull: { likes: `${req.user._id}` },
            },
            true,
            next,
          );
        }
      }
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
