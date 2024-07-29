class UserHandler {
  constructor(userService) {
    this.userService = userService;

    // binding
    this.getAllUsers = this.getAllUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateUserProfilePicture = this.updateUserProfilePicture.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await this.userService.updateUser(
        id,
        name,
        email,
        password
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateUserProfilePicture(req, res) {
    try {
      const { id } = req.params;
      const { profilePicture } = req.body;
      const updatedUser = await this.userService.updateUserProfilePicture(
        id,
        profilePicture
      );
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await this.userService.deleteUser(id);
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserHandler;
