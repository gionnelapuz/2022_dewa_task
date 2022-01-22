const Chart = require("../../models/chart");

async function getAll() {
  return await Chart.query().select('name', 'description', 'key').orderBy('id', 'asc');
}

module.exports = {
  getAll
};
