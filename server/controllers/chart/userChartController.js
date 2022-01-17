const UserChartRepository = require('../../repositories/chart/userChartRepository');

const { successResponse, errorResponse } = require("../../helpers/responses");

async function getAll(req, res) {
  try {
    const response = await UserChartRepository.getAll();
    successResponse(res, response);
  } catch (err) {
    errorResponse(res, err);
  }
}

async function store(req, res) {
  try {
    const response = await UserChartRepository.store(req.body);
    successResponse(res, response);
  } catch (err) {
    errorResponse(res, err);
  }
}


async function deleteData(req, res) {
  try {
    const { id } = req.query
    const response = await UserChartRepository.deleteData(id);
    successResponse(res, response);
  } catch (err) {
    errorResponse(res, err);
  }
}

module.exports = {
  getAll,
  store,
  deleteData
};
