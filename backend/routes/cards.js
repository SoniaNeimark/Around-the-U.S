const express = require('express');
const { cardsCollection, card, cardLikes } = require('../paths/paths');
const {
  cardBodyValidation,
  headersValidation,
  paramsValidation,
  validateRequest,
} = require('../helpers/requestValidation');
const {
  getCards,
  createCard,
  getCardById,
  deleteCard,
  addLike,
  deleteLike,
  updateCard,
} = require('../controllers/cards');

const router = express.Router();

router.get(
  cardsCollection,
  validateRequest({ ...headersValidation }),
  getCards,
);

router.get(
  card,
  validateRequest({ ...headersValidation, ...paramsValidation }),
  getCardById,
);

router.post(
  cardsCollection,
  validateRequest({ ...headersValidation, ...cardBodyValidation }),
  createCard,
);

router.patch(
  card,
  validateRequest({
    ...headersValidation,
    ...paramsValidation,
    ...cardBodyValidation,
  }),
  updateCard,
);

router.put(
  cardLikes,
  validateRequest({ ...headersValidation, ...paramsValidation }),
  addLike,
);

router.delete(
  cardLikes,
  validateRequest({ ...headersValidation, ...paramsValidation }),
  deleteLike,
);

router.delete(
  card,
  validateRequest({ ...headersValidation, ...paramsValidation }),
  deleteCard,
);

module.exports = router;
