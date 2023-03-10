const bcrypt = require('bcrypt');

const { SALT_ROUND } = require('../../constant');

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUND);
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = { hashPassword, comparePassword };