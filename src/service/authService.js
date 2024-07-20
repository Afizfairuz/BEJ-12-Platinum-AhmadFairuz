const UserRepository = require("../repository/UserRepository");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(user) {
    const newUser = await this.userRepository.createUser(user);
    return newUser;
  }

  async login(email, password) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    return user;
  }
}

module.exports = AuthService;
