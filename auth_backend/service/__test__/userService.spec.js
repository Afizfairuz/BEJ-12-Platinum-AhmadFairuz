const UserService = require("../userService");
const UserRepository = require("../../repository/userRepository");

// Mocking the UserRepository
jest.mock("../../repository/userRepository");

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService(new UserRepository());
  });

  // Positive Case for getAllUsers
  it('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    UserRepository.prototype.findAll.mockResolvedValue(mockUsers);

    const users = await userService.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  // Positive Case for createUser
  it('should create and return a new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com', password: 'password123' };
    const createdUser = { id: 1, ...newUser };
    UserRepository.prototype.createUser.mockResolvedValue(createdUser);

    const user = await userService.createUser(newUser);
    expect(user).toEqual(createdUser);
  });

  // Positive Case for getUserByEmail
  it('should return a user by email', async () => {
    const email = 'dave@example.com';
    const foundUser = { id: 2, name: 'Dave', email };
    UserRepository.prototype.getUserByEmail.mockResolvedValue(foundUser);

    const user = await userService.getUserByEmail(email);
    expect(user).toEqual(foundUser);
  });

  // Positive Case for updateUser
  it('should update and return the user', async () => {
    const id = 1;
    const updatedData = { name: 'Eve', email: 'eve@example.com', password: 'newpassword' };
    const updatedUser = { id, ...updatedData };
    UserRepository.prototype.updateUser.mockResolvedValue(updatedUser);

    const user = await userService.updateUser(id, updatedData.name, updatedData.email, updatedData.password);
    expect(user).toEqual(updatedUser);
  });

  // Positive Case for updateUserProfilePicture
  it('should update and return the user\'s profile picture', async () => {
    const id = 1;
    const profilePicture = 'newProfilePic.jpg';
    const updatedUser = { id, profilePicture };
    UserRepository.prototype.updateUserProfilePicture.mockResolvedValue(updatedUser);

    const user = await userService.updateUserProfilePicture(id, profilePicture);
    expect(user.profilePicture).toEqual(profilePicture);
  });

  // Positive Case for deleteUser
  it('should delete the user and return the number of deleted users', async () => {
    const id = 1;
    UserRepository.prototype.deleteUser.mockResolvedValue(1);

    const result = await userService.deleteUser(id);
    expect(result).toBe(1);
  });

  // Negative Case for handling errors
  it('should throw an error when getAllUsers fails', async () => {
    UserRepository.prototype.findAll.mockRejectedValue(new Error('Database error'));

    await expect(userService.getAllUsers()).rejects.toThrow('Database error');
  });

  it('should throw an error when createUser fails', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com', password: 'password123' };
    UserRepository.prototype.createUser.mockRejectedValue(new Error('Database error'));

    await expect(userService.createUser(newUser)).rejects.toThrow('Database error');
  });

  it('should throw an error when getUserByEmail fails', async () => {
    const email = 'dave@example.com';
    UserRepository.prototype.getUserByEmail.mockRejectedValue(new Error('Database error'));

    await expect(userService.getUserByEmail(email)).rejects.toThrow('Database error');
  });

  it('should throw an error when updateUser fails', async () => {
    const id = 1;
    const updatedData = { name: 'Eve', email: 'eve@example.com', password: 'newpassword' };
    UserRepository.prototype.updateUser.mockRejectedValue(new Error('Database error'));

    await expect(userService.updateUser(id, updatedData.name, updatedData.email, updatedData.password)).rejects.toThrow('Database error');
  });

  it('should throw an error when updateUserProfilePicture fails', async () => {
    const id = 1;
    const profilePicture = 'newProfilePic.jpg';
    UserRepository.prototype.updateUserProfilePicture.mockRejectedValue(new Error('Database error'));

    await expect(userService.updateUserProfilePicture(id, profilePicture)).rejects.toThrow('Database error');
  });

  it('should throw an error when deleteUser fails', async () => {
    const id = 1;
    UserRepository.prototype.deleteUser.mockRejectedValue(new Error('Database error'));

    await expect(userService.deleteUser(id)).rejects.toThrow('Database error');
  });
});
