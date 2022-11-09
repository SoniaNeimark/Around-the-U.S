const {
  throwNotOwnerError,
  notFoundError,
  throwServerError,
} = require('./errors');

const testIfOwner = (req, document) => {
  if (document.owner) {
    return `${document.owner}` === `${req.user._id}`;
  }
  return `${document._id}` === `${req.user._id}`;
};
const optionsFindAndUpdate = {
  new: true,
  runValidators: true,
  upsert: false,
};

//  Find
const findItemById = (req, res, next, model) => {
  model
    .findById(req.params.id ? req.params.id : req.user._id)
    .orFail(notFoundError())
    .then((item) => res.send(item))
    .catch(next);
};

// Create
const createItem = (req, res, next, model, reqBody) => {
  const item = model === 'Card' ? { ...reqBody, owner: req.user._id } : reqBody;
  model
    .create({ ...item })
    .then((newItem) => {
      if (newItem.password) {
        const { password, ...itemToReturn } = newItem._doc;
        if (password) {
          res.send(itemToReturn);
        }
        throwServerError();
      }
      res.send({ data: newItem });
    })
    .catch(next);
};

// Update
const updateItem = (req, res, next, model, reqBody) => {
  model
    .findByIdAndUpdate(
      req.params.id ? req.params.id : req.user._id,
      reqBody,
      optionsFindAndUpdate,
    )
    .orFail(notFoundError())
    .then((updatedItem) => res.send(updatedItem))
    .catch(next);
};

// Delete
const deleteItem = (req, res, model, next) => {
  model
    .findById(req.params.id)
    .orFail(notFoundError())
    .then((document) => {
      if (!testIfOwner(req, document)) {
        throwNotOwnerError();
      } else {
        model
          .findByIdAndRemove(req.params.id)
          .orFail(notFoundError())
          .then((removedItem) => res
            .send({ message: `${removedItem.name} deleted` }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  findItemById,
  createItem,
  deleteItem,
  updateItem,
  testIfOwner,
};
