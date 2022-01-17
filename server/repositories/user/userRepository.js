const User = require('../../models/user/user');

async function getById(id) {
  return await User.query().findById(id);
}

async function getByEmail(email) {
  return await User.query().where('email', email).first();
}

module.exports = {
  getById,
  getByEmail,
};
