const bcrypt = require('bcryptjs');
const { passwordUtil } = require('../../src/utils');

describe('Password Util', () => { 
  it('should generate a random password', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('123456');
    const hashedPassword = await passwordUtil.hashPassword('password');
    expect(hashedPassword).toEqual('123456');
  });

  it('should compare a password', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    const result = await passwordUtil.comparePassword('password', '123456');
    expect(result).toEqual(true);
  });
});