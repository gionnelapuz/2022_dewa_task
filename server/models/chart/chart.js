const { Model } = require('objection');

const knex = require('../../config/db/knex');
Model.knex(knex);

class Chart extends Model {
  static get tableName() {
    return 'charts';
  }
}
module.exports = Chart;
