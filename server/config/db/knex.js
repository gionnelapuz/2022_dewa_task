let config = require('./knexfile')
module.exports = require('knex')(process.env.NODE_ENV !== 'test' ? config : config.test)