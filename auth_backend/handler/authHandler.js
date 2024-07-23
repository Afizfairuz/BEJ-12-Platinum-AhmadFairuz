class AuthHandler {
  constructor(authService) {
    this.authService = authService;

    // binding
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    const payload = req.body;
    const serviceRes = await this.authService.register(payload);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
      created_user: serviceRes.createdUser,
    });
  }

  async login(req, res) {
    const payload = req.body;
    const serviceRes = await this.authService.login(payload);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
      token: serviceRes.token,
    });
  }
}

module.exports = AuthHandler;
