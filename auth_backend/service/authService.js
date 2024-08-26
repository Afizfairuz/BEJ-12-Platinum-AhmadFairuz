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

      if (!newUser) {
        throw new Error("Failed to create user");
      } else if (newUser) {
        const otp = generateOTP();

        await this.userRepository.createOtp(newUser.id, otp);
      }

      // nodemailer
      const mail = {
        from: '"Bingle Shop" <kelompok2-bej12@gmail.com>',
        to: "javidnam3@gmail.com",
        subject: "verifikasi akun bingle shop",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #333;">Verifikasi Akun Bingle Shop</h2>
        <p style="font-size: 16px; color: #555;">
          Terima kasih telah mendaftar di <strong>Bingle Shop</strong>! Untuk menyelesaikan proses registrasi, silakan masukkan kode verifikasi berikut di halaman verifikasi:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</span>
        </div>
        <p style="font-size: 16px; color: #555;">
          Jika Anda tidak melakukan pendaftaran ini, harap abaikan email ini.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 14px; color: #999; text-align: center;">
          &copy; 2024 Bingle Shop. All rights reserved.
        </p>
      </div>
    `,
      };

      const sendMail = await this.mailRepository.sendMail(mail);
      console.log("Email berhasil dikirim:", sendMail);
      console.log("Email:", mail);

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

  async validateOtp(otp) {
    try {
      const otpUser = await this.userRepository.getUserByOtp(otp);
      if (otpUser) {
        return {
          statusCode: 200,
          message: "berhasil mendapatkan data berdasarkan otp",
          data: otpUser,
        };
      } else {
        return{
          statusCode: 400,
          message: "gagal mendapatkan data",
        }
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
