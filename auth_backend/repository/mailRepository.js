const nodemailer = require("nodemailer");
const smtp = require("../../auth_backend/config/smtp");

class MailRepository {
  constructor() {}
  async sendMail(mail) {
    try {
      const transporter = nodemailer.createTransport(smtp);
      console.log(transporter);
      const info = transporter.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });

      return info;
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }
  }
}

module.exports = MailRepository;
