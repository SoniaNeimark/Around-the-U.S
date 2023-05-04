const mongoose = require('mongoose');
const stringValidator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    maxlength: 2048,
    validate: {
      validator(v) {
        return stringValidator.isURL(v);
      },
      message: 'Invalid url value',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Array,
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
