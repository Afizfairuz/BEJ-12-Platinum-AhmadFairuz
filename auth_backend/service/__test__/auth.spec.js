const AuthService = require("../authService");
const UserRepository = require("../../repository/userRepository");

describe('register', () => {
  // Positive case
  it('success: should return the registered user', async () => {
    // Create mock for user repository
    const mockUserRepository = new UserRepository();
    const registerRequest = {
      "name": "javid",
      "email": "javid@gmail.com",
      "password": "123"
    }

    const expectedRegisterResponse = {
      statusCode: 201,
      message: "berhasil melakukan register",
      createdUser: {
        "id": 1,
        "name": "javid",
        "email": "javid@gmail.com",
        "password": "$2b$10$PJgveb2COp1daGk8r9nrIeA.s3A47xSD63tvRyM73HsmQHtEdaC5m",
        "updatedAt": "2024-08-05T14:50:33.834Z",
        "createdAt": "2024-08-05T14:50:33.834Z"
      }
    }

    mockUserRepository.createUser = jest.
      fn().
      mockImplementation(() => Promise.resolve(expectedRegisterResponse.createdUser));

    const authService = new AuthService(mockUserRepository);
    const registeredUser = await authService.register(registerRequest);

    expect(registeredUser.statusCode).toEqual(expectedRegisterResponse.statusCode);
    expect(registeredUser.message).toEqual("berhasil melakukan register");
    expect(registeredUser.createdUser.id).toEqual(expectedRegisterResponse.createdUser.id);
    expect(registeredUser.createdUser.email).toEqual(expectedRegisterResponse.createdUser.email);
  });
});