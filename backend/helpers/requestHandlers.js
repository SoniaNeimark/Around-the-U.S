const { throwNotOwnerError, throwNotFoundError } = require('./errors');

const testIfOwner = (req, document) => `${document.owner}` === `${req.user._id}`;

const paramsFindAndUpdate = {
  new: true,
  runValidators: true,
  upsert: false,
};

// Create
const createItem = (req, res, model, params, card, next) => {
  const item = card ? { ...params, owner: req.user._id } : params;
  model
    .create({ ...item })
    .then((newItem) => {
      res.send({ data: newItem });
    })
    .catch(next);
};

// Update
const updateItem = (req, res, model, id, reqBody, likes, next) => {
  model
    .findById(id)
    .then((item) => {
      if (!item) {
        throwNotFoundError();
      }
      if (!likes && id !== req.user._id && !testIfOwner(req, item)) {
        throwNotOwnerError();
      } else {
        model
          .findByIdAndUpdate(id, reqBody, paramsFindAndUpdate)
          .then((sameItem) => {
            res.send({ data: sameItem });
          })
          .catch(next);
      }
    })
    .catch(next);
};

// Delete
const deleteItem = (req, res, model, next) => {
  model
    .findById(req.params.id)
    .then((document) => {
      if (!document) {
        throwNotFoundError();
      }
      if (!testIfOwner(req, document)) {
        throwNotOwnerError();
      } else {
        model
          .findByIdAndRemove(req.params.id)
          .orFail()
          .then((sameItem) => res.send({ message: `${sameItem.name} deleted` }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  createItem,
  deleteItem,
  updateItem,
};
