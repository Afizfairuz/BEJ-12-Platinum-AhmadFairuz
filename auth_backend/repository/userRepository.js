const User = require("../../models/user");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async findAll() {
    try {
      const userList = await this.User.findAll();
      return userList;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async createUser(user) {
    try {
      const newUser = await this.User.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return newUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateUser(id, name, email, password) {
    try {
      const updatedUser = await this.User.update(
        { name, email, password },
        {
          where: { id },
          returning: true,
        }
      );
      return updatedUser[1][0];
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async updateUserProfilePicture(id, profilePicture) {
    try {
      const updatedUser = await this.User.update(
        { profilePicture },
        { where: { id }, returning: true }
      );
      return updatedUser[1][0];
    } catch (error) {
      throw new Error(`Failed to update profile picture: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await this.User.destroy({ where: { id } });
      return deletedUser;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  async createToken(id, user) {
    try {
      const newData = { token: user.token, session: user.session };

      const newToken = await this.User.update(newData, { where: { id } });
      return newToken;
    } catch (error) {
      throw new Error(`Failed to create token and session: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const userId = await this.User.findOne({ where: { id } });
      return userId;
    } catch (error) {
      throw new Error(`Failed to get token and session: ${error.message}`);
    }
  }

  async deleteToken(id) {
    try {
      const data = { token: "", session: "" };

      const deletedToken = await this.User.update(data, { where: { id } });
      return deletedToken;
    } catch (error) {
      throw new Error(`Failed to delete token and session: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
