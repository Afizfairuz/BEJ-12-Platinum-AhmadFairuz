const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register({ name, email, password }) {
    try {
      const emailUser = await this.userRepository.getUserByEmail(email);
      if (emailUser) {
        return {
          statusCode: 400,
          message: "Pengguna sudah ada",
        };
      }

      const salt = 10;
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const newUser = await this.userRepository.createUser({
        name,
        email,
        password: encryptedPassword,
      });

      return {
        statusCode: 201,
        createdUser: newUser,
      };
    } catch (err) {
      return {
        statusCode: 500,
        createdUser: null,
      };
    }
  }

  async login({ email, password }) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const userValid = bcrypt.compareSync(password, user.password);

    if (userValid) {
      // generate jwt token
      const jwtSecret = "SECRET";
      const jwtExpireTime = "24h";

      const token = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );
      return {
        statusCode: 200,
        message: "Login berhasil",
        token: token,
      };
    }

    return {
      statusCode: 400,
      message: "Login gagal",
      token: null,
    };
  }
}

module.exports = AuthService;
