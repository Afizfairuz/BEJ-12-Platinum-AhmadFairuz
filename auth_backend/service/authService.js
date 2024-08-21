const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONST = require("../../auth_backend/constant/jwtconstant");

class AuthService {
  constructor(userRepository, mailRepository) {
    this.userRepository = userRepository;
    this.mailRepository = mailRepository;
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
      
            function generateOTP() {
              const otp = Math.floor(100000 + Math.random() * 900000);
              return otp.toString();
            }
      
      // nodemailer
      const mail = {
        from: 'faruuq.aiesec@gmail.com',
        to: 'faruuq.q@icloud.com',
        subject: 'verifikasi akun bingle shop',
        text: `Kode verifikasi anda adalah: ${generateOTP()}`,
      };

      // try {
        const sendMail = await this.mailRepository.sendMail(mail)
        console.log("Email berhasil dikirim:", sendMail);
        console.log("Email:", mail);
        // console.log("Respons server:", sendMail.response);


      // } catch (mailError) {
      //   console.error("Gagal mengirim email:", mailError);
      //   return {
      //     statusCode: 500,
      //     message: "Berhasil mendaftar, tetapi gagal mengirim email verifikasi",
      //     createdUser: newUser,
      //   };
      // }

      return {
        statusCode: 201,
        message: "berhasil melakukan register",
        createdUser: newUser,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: `Terjadi kesalahan: ${err.message}`,
        createdUser: null,
      };
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        return { message: "User not found" };
      }
      const userValid = bcrypt.compareSync(password, user.password);
      if (userValid) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          CONST.JWT.SECRET,
          {
            expiresIn: CONST.JWT.EXPIRE_TIME,
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
    } catch (err) {
      return {
        statusCode: 500,
        message: `Terjadi kesalahan: ${err.message}`,
      };
    }
  }

  async createToken(id, user) {
    try {
      const tokenUser = await this.userRepository.createToken(id, user);
      if (tokenUser) {
        return {
          statusCode: 200,
          message: "berhasil membuat token dan session",
          data: tokenUser,
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: `Terjadi kesalahan: ${err.message}`,
      };
    }
  }
  async getToken(id) {
    try {
      const tokenUser = await this.userRepository.getUserById(id);
      if (tokenUser) {
        return {
          statusCode: 200,
          message: "berhasil mendapatkan data token dan session",
          data: tokenUser,
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: `Terjadi kesalahan: ${err.message}`,
      };
    }
  }
  async logout(id) {
    try {
      const tokenUser = await this.userRepository.deleteToken(id);
      if (tokenUser) {
        return {
          statusCode: 200,
          message: "berhasil logout",
        };
      } else {
        return {
          statusCode: 404,
          message: "User tidak ditemukan",
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        message: `Terjadi kesalahan: ${err.message}`,
      };
    }
  }
}

module.exports = AuthService;
