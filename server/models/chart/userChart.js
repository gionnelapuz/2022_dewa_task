const { Model } = require('objection');

const knex = require('../../config/db/knex');
Model.knex(knex);

class UserChart extends Model {
  static get tableName() {
    return 'user_charts';
  }

  static get relationMappings() {
    const User = require('../user/user');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_charts.user_id',
          to: 'users.id',
        },
      }
    };
  }
}
module.exports = UserChart;
