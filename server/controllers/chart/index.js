const ChartRepository = require('../../repositories/chart');

const { successResponse, errorResponse } = require("../../helpers/responses");

async function getAll(req, res) {
  try {
    const response = await ChartRepository.getAll();
    successResponse(res, response);
  } catch (err) {
    errorResponse(res, err);
  }
}

module.exports = {
  getAll
};
