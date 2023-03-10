const { userController } = require('../../src/controllers');
const { userService } = require('../../src/services');
const { CustomError } = require('../../src/utils');

describe('User Controller', () => { 
  const mockData = {
    id: 1,
    username: 'test',
  };
  const mockToken = {
    token: 'test token',
  };
  it('should create a new user', async () => {
    jest.spyOn(userService, 'createUser').mockResolvedValue(mockData);
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(201);
    expect(mockResponse.json).toBeCalledWith({ data: mockData });
  });

  it('should return status 500 and error message when createUser called', async () => {
    jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('Internal Server Error'));
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({ error: 'Internal Server Error' });
  });

  it('should return CustomError when createUser called', async () => {
    jest.spyOn(userService, 'createUser').mockRejectedValue(new CustomError(400, 'User Error'));
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({ error: 'User Error' });
  });

  it('should return token when user login', async () => {
    jest.spyOn(userService, 'loginUser').mockResolvedValue(mockToken);
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.loginUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith(mockToken);
  });

  it('should return status 500 and error message when loginUser called', async () => {
    jest.spyOn(userService, 'loginUser').mockRejectedValue(new Error('Internal Server Error'));
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.loginUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({ error: 'Internal Server Error' });
  });

  it('should return CustomError when loginUser called', async () => {
    jest.spyOn(userService, 'loginUser').mockRejectedValue(new CustomError(400, 'User Error'));
    const mockRequest = {
      body: jest.fn(),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.loginUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({ error: 'User Error' });
  });

  it('should logout user', async () => {
    jest.spyOn(userService, 'logoutUser').mockResolvedValue('logout');
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.logoutUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({ data: 'logout' });
  });

  it('should return status 500 and error message when logoutUser called', async () => {
    jest.spyOn(userService, 'logoutUser').mockRejectedValue(new Error('Internal Server Error'));
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.logoutUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({ error: 'Internal Server Error' });
  });

  it('should return CustomError when logoutUser called', async () => {
    jest.spyOn(userService, 'logoutUser').mockRejectedValue(new CustomError(400, 'User Error'));
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.logoutUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({ error: 'User Error' });
  });

  it('validate user', async () => {
    jest.spyOn(userService, 'validateUser').mockResolvedValue(mockData);
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.validateUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({ data: mockData });
  });

  it('should return status 500 and error message when validateUser called', async () => {
    jest.spyOn(userService, 'validateUser').mockRejectedValue(new Error('Internal Server Error'));
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.validateUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({ error: 'Internal Server Error' });
  });

  it('should return CustomError when validateUser called', async () => {
    jest.spyOn(userService, 'validateUser').mockRejectedValue(new CustomError(400, 'User Error'));
    const mockRequest = {
      headers: {
        authorization: 'Bearer test',
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await userController.validateUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({ error: 'User Error' });
  });
});