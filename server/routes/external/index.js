const express = require('express');
const router = express.Router();

const ExternalController = require('../../controllers/external');

router.post('/', ExternalController.get);

module.exports = router;
