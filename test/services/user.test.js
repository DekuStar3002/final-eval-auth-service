/* eslint-disable no-unused-vars */
const { userService } = require('../../src/services');
const { passwordUtil, jwtUtil, redisUtil, CustomError } = require('../../src/utils');
const { User } = require('../../database/models');

describe('User Service', () => { 
  const mockData = {
    username: 'test',
    password: 'test',
  };

  it('should create a new user', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(mockData);
    jest.spyOn(passwordUtil, 'hashPassword').mockResolvedValue('hashPassword');
    const result = await userService.createUser(mockData);
    expect(result).toEqual({ username: 'test' });
  });

  it('should login a user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(true);
    jest.spyOn(passwordUtil, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(jwtUtil, 'signToken').mockResolvedValue('token');
    jest.spyOn(redisUtil, 'setToRedisStore').mockResolvedValue();

    const result = await userService.loginUser(mockData);
    expect(result).toEqual({ token: 'Bearer: token' });
  });

  // it('should not login a user when user does\'t exist', async () => {
  //   jest.spyOn(User, 'findOne').mockResolvedValue(null);
  //   jest.spyOn(passwordUtil, 'comparePassword').mockResolvedValue(null);
  //   expect(userService.loginUser(mockData)).rejects.toEqual(expect.objctContaining({ status: 401 }));
  // });
  
  // it('should not login a user when password does\'t match', async () => {
  //   jest.spyOn(User, 'findOne').mockResolvedValue(true);
  //   jest.spyOn(passwordUtil, 'comparePassword').mockResolvedValue(false);
  //   expect(userService.loginUser(mockData)).rejects.toEqual(expect.objctContaining({ message: 'Wrong Password' }));
  // });

  it('should logout a user', async () => {
    jest.spyOn(redisUtil, 'removeFromRedisStore').mockResolvedValue();
    const result = await userService.logoutUser();
    expect(result).toEqual({ message: 'Logged out successfully' });
  });

  it('should validate user', async () => {
    jest.spyOn(redisUtil, 'getFromRedisStore').mockResolvedValue(true);
    jest.spyOn(jwtUtil, 'verifyToken').mockResolvedValue('token');
    const result = await userService.validateUser();
    expect(result).toEqual('token');
  });

  // it('should not validate user if token not present in redis', async () => {
  //   jest.spyOn(redisUtil, 'getFromRedisStore').mockResolvedValue(false);
  //   const result = await userService.validateUser();
  //   expect(result).rejects.toThrow();
  // });

  // it('should not validate user if token is invalid', async () => {
  //   jest.spyOn(redisUtil, 'getFromRedisStore').mockResolvedValue(true);
  //   jest.spyOn(jwtUtil,'verifyToken').mockResolvedValue(false);
  //   const result = await userService.validateUser();
  //   expect(result).rejects.toThrow();
  // });
});