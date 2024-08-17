const UserHandler = require("../userHandler");
const UserService = require("../../service/userService");

// Mocking the UserService
jest.mock("../../service/userService");

describe('UserHandler', () => {
  let userHandler;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    userHandler = new UserHandler(new UserService());

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  // Test for getAllUsers
  it('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    UserService.prototype.getAllUsers.mockResolvedValue(mockUsers);

    mockRequest = {};

    await userHandler.getAllUsers(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  // Test for createUser
  it('should create and return a new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com', password: 'password123' };
    const createdUser = { id: 1, ...newUser };
    UserService.prototype.createUser.mockResolvedValue(createdUser);

    mockRequest = { body: newUser };

    await userHandler.createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdUser);
  });

  // Test for getUserByEmail
  it('should return a user by email', async () => {
    const email = 'dave@example.com';
    const foundUser = { id: 2, name: 'Dave', email };
    UserService.prototype.getUserByEmail.mockResolvedValue(foundUser);

    mockRequest = { params: { email } };

    await userHandler.getUserByEmail(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(foundUser);
  });

  // Test for updateUser
  it('should update and return the user', async () => {
    const id = 1;
    const updatedData = { name: 'Eve', email: 'eve@example.com', password: 'newpassword' };
    const updatedUser = { id, ...updatedData };
    UserService.prototype.updateUser.mockResolvedValue(updatedUser);

    mockRequest = { params: { id }, body: updatedData };

    await userHandler.updateUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
  });

  // Test for updateUserProfilePicture
  it('should update and return the user\'s profile picture', async () => {
    const id = 1;
    const profilePicture = 'newProfilePic.jpg';
    const updatedUser = { id, profilePicture };
    UserService.prototype.updateUserProfilePicture.mockResolvedValue(updatedUser);

    mockRequest = { params: { id }, body: { profilePicture } };

    await userHandler.updateUserProfilePicture(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(updatedUser);
  });

  // Test for deleteUser
  it('should delete the user and return status 204', async () => {
    const id = 1;
    UserService.prototype.deleteUser.mockResolvedValue(1);

    mockRequest = { params: { id } };

    await userHandler.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  // Test for error handling
  it('should return status 500 when getAllUsers throws an error', async () => {
    UserService.prototype.getAllUsers.mockRejectedValue(new Error('Database error'));

    await userHandler.getAllUsers(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Database error' });
  });

  // Similar tests for other methods when they throw errors
});
