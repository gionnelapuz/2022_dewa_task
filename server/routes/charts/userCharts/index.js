const express = require('express');
const router = express.Router();

const UserChartController = require('../../../controllers/chart/userChartController');

router.get('/', UserChartController.getAll);

router.post('/', UserChartController.store);

router.delete('/:id', UserChartController.deleteData);

module.exports = router;
