const express = require('express');
const { throwNotFoundError } = require('../helpers/errors');

const router = express.Router();

router.get('*', throwNotFoundError);

router.post('*', throwNotFoundError);

router.patch('*', throwNotFoundError);

router.put('*', throwNotFoundError);

router.delete('*', throwNotFoundError);

module.exports = router;
