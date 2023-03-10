const jwt = require('jsonwebtoken');

const signToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { signToken, verifyToken };