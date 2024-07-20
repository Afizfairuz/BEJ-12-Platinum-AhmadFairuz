const AuthService = require('../service/authService');

class AuthHandler {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.authService.register({
        name,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuthHandler;