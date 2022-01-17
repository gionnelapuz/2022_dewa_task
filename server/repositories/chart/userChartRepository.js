const UserChart = require("../../models/chart/userChart");

async function getAll() {
  return await UserChart.query().select('id', 'title', 'keys', 'created_at').orderBy('created_at', 'desc');
}

async function store({ user_id, chart_id, title, keys, order }) {
  return await UserChart.query().insert({
    user_id,
    chart_id,
    title,
    keys,
    order,
  });
}

async function deleteData(id) {
  return await UserChart.query().where("id", id).delete();
}

module.exports = {
  store,
  getAll,
  deleteData,
};
