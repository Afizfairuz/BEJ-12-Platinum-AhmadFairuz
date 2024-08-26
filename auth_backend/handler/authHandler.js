class AuthHandler {
  constructor(authService) {
    this.authService = authService;

    // binding
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.createToken = this.createToken.bind(this);
    this.logout = this.logout.bind(this);
    this.validateOtp = this.validateOtp.bind(this);
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

  async createToken(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const serviceRes = await this.authService.createToken(id, payload);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
      data: serviceRes.data,
    });
  }

  async logout(req, res) {
    const id = req.params.id;
    const serviceRes = await this.authService.logout(id);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
    });
  }

  async validateOtp(req, res) {
    const otp = req.query.otp;
    const serviceRes = await this.authService.validateOtp(otp);

    res.status(serviceRes.statusCode).send({
      message: serviceRes.message,
      data: serviceRes.data,
    });
  }
}

module.exports = AuthHandler;
