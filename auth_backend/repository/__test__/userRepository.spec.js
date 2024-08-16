const UserRepository = require("../userRepository");
const User = require("../../../models/user");

// Mocking the User model
jest.mock("../../../models/user");

describe("UserRepository", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  // Positive Case for findAll
  it("should return a list of users", async () => {
    const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
    User.findAll.mockResolvedValue(mockUsers);

    const users = await userRepository.findAll();
    expect(users).toEqual(mockUsers);
  });

  // Positive Case for createUser
  it("should create and return a new user", async () => {
    const newUser = { name: "Charlie", email: "charlie@example.com", password: "password123" };
    const createdUser = { id: 1, ...newUser };
    User.create.mockResolvedValue(createdUser);

    const user = await userRepository.createUser(newUser);
    expect(user).toEqual(createdUser);
  });

  // Positive Case for getUserByEmail
  it("should return a user by email", async () => {
    const email = "dave@example.com";
    const foundUser = { id: 2, name: "Dave", email };
    User.findOne.mockResolvedValue(foundUser);

    const user = await userRepository.getUserByEmail(email);
    expect(user).toEqual(foundUser);
  });

// Positive Case for updateUser
it("should update and return the user", async () => {
  const id = 1;
  const updatedData = { name: "Eve", email: "eve@example.com", password: "newpassword" };

  const updatedUser = { id, ...updatedData };

  User.update.mockResolvedValue([1, [updatedUser]]);

  const user = await userRepository.updateUser(id, updatedData.name, updatedData.email, updatedData.password);
  
  expect(user).toEqual(updatedUser);
});


  // Positive Case for updateUserProfilePicture
  it("should update and return the user's profile picture", async () => {
    const id = 1;
    const profilePicture = "newProfilePic.jpg";
    const updatedUser = [1, [{ id, profilePicture }]];
    User.update.mockResolvedValue(updatedUser);

    const user = await userRepository.updateUserProfilePicture(id, profilePicture);
    expect(user.profilePicture).toEqual(profilePicture);
  });

  // Positive Case for deleteUser
  it("should delete the user and return the number of deleted users", async () => {
    const id = 1;
    User.destroy.mockResolvedValue(1);

    const result = await userRepository.deleteUser(id);
    expect(result).toBe(1);
  });

  // Negative Case for handling errors
  it("should throw an error when findAll fails", async () => {
    User.findAll.mockRejectedValue(new Error("Database error"));

    await expect(userRepository.findAll()).rejects.toThrow("Failed to fetch users: Database error");
  });
  
  // Negative Case for handling errors during createUser
  it("should throw an error when createUser fails", async () => {
    const newUser = { name: "Charlie", email: "charlie@example.com", password: "password123" };
    User.create.mockRejectedValue(new Error("Database error"));

    await expect(userRepository.createUser(newUser)).rejects.toThrow("Failed to create user: Database error");
  });

});
