const express = require('express');

const {
  usersCollection,
  user,
  ownerProfile,
  ownerAvatar,
} = require('../paths/paths');

const {
  headersValidation,
  paramsValidation,
  userBodyValidation,
  avatarBodyValidation,
  validateRequest,
} = require('../helpers/requestsValidation');

const {
  getUsers,
  getUserById,
  updateUser,
  getCurrrentUser,
  updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get(
  usersCollection,
  validateRequest({ ...headersValidation }),
  getUsers,
);

router.get(
  ownerProfile,
  validateRequest({ ...headersValidation }),
  getCurrrentUser,
);

router.get(
  user,
  validateRequest({ ...headersValidation, ...paramsValidation }),
  getUserById,
);

router.patch(
  ownerProfile,
  validateRequest({ ...headersValidation, ...userBodyValidation }),
  updateUser,
);

router.patch(
  ownerAvatar,
  validateRequest({ ...headersValidation, ...avatarBodyValidation }),
  updateAvatar,
);

module.exports = router;
