const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { maxAge, secret } = require('../config').cookie

const generateToken = async (data) => {
  return jwt.sign({ data }, secret, {
    expiresIn: maxAge,
  });
};

const verifyToken = async (token) => {
  return jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

const generateHashPassword = async (plainTextPassword) => {
  return bcrypt.hashSync(plainTextPassword, 10);
};

const compareHashPassword = async (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  generateHashPassword,
  compareHashPassword,
};
