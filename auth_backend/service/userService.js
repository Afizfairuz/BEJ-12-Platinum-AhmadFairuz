const UserRepository = require("../repository/UserRepository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async createUser(user) {
    return await this.userRepository.createUser(user);
  }

  async getUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async updateUser(id, name, email, password) {
    return await this.userRepository.updateUser(id, name, email, password);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

module.exports = UserService;
