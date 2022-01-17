const express = require('express');
const router = express.Router();

const ChartController = require('../../controllers/chart/userChartController');

router.post('/', ChartController.getAll);
router.delete('/', ChartController.deleteData);
router.post('/user', ChartController.store);

module.exports = router;
