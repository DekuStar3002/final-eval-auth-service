const jwt = require('jsonwebtoken');
const { jwtUtil } = require('../../src/utils');

describe('JWT Utils', () => { 
  const mockPayload = {
    id: 1,
    name: 'name'
  };
  it('should sign a token', async () => {
    jest.spyOn(jwt, 'sign').mockResolvedValue('token');
    const token = await jwtUtil.signToken(mockPayload);
    expect(token).toEqual('token');
  }); 

  it('should verify a token', async () => {
    jest.spyOn(jwt,'verify').mockResolvedValue(mockPayload);
    const payload = await jwtUtil.verifyToken('token');
    expect(payload).toEqual(mockPayload);
  });
});