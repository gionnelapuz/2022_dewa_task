const express = require('express');
const router = express.Router();

const userChartRoutes = require('./userCharts')

const ChartController = require('../../controllers/chart');

router.get('/', ChartController.getAll);

router.use('/user', userChartRoutes)

module.exports = router;
