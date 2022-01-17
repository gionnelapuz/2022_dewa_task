const { Model } = require('objection');

const knex = require('../../config/db/knex');
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const UserChart = require('../chart/userChart');

    return {
      company: {
        relation: Model.HasManyRelation,
        modelClass: UserChart,
        join: {
          from: 'users.id',
          to: 'user_charts.user_id',
        },
      },
    };
  }
}
module.exports = User;
