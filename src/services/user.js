const { CustomError, passwordUtil, jwtUtil, redisUtil } = require('../utils');
const { User } = require('../../database/models');

const createUser = async (email, password) => {
  const hashPassword = await passwordUtil.hashPassword(password);
  const newUser = await User.create({
    email,
    password: hashPassword
  });
  console.log(newUser);
  return { id: newUser.id, email: newUser.email };
};

const loginUser = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if(!existingUser) {
    throw new CustomError(401, 'User Not Found with username');
  }
  const checkPassword = await passwordUtil.comparePassword(password, existingUser.password);
  if(!checkPassword) {
    throw new CustomError(401, 'Wrong Password');
  }
  const payload = {
    id: existingUser.id,
    email: existingUser.email
  };
  const token = await jwtUtil.signToken(payload);
  await redisUtil.setToRedisStore(token);
  return { token: `Bearer: ${token}` };
};

const logoutUser = async (token) => {
  await redisUtil.removeFromRedisStore(token);
  return { message: 'Logged out successfully' };
};

const validateUser = async (token) => {
  const redisToken = redisUtil.getFromRedisStore(token);
  if(!redisToken) {
    throw new CustomError(401, 'Invalid Token');
  }

  const verifyToken = await jwtUtil.verifyToken(token);
  if(!verifyToken) {
    throw new CustomError(401, 'Invalid Token');
  }

  return verifyToken;
};

module.exports = { createUser, loginUser, logoutUser, validateUser };