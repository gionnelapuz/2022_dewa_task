const axios = require("axios");

const {
  retrieveDataSet,
  generateChartData,
} = require("../../utils/charts/dataSetHelpers");

const { successResponse, errorResponse } = require("../../helpers/responses");

async function get(req, res) {
  try {
    const { url, dataSetKey, chartKeys } = req.body;

    const response = await axios.get(url);

    const dataSetFromResponse = await retrieveDataSet(
      response.data,
      dataSetKey
    );

    const generatedChartData = await generateChartData(
      dataSetFromResponse,
      chartKeys
    );

    successResponse(res, generatedChartData);
  } catch (err) {
    errorResponse(res, err);
  }
}

module.exports = {
  get,
};
