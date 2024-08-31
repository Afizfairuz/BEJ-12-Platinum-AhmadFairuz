const nodemailer = require("nodemailer");
const smtp = require("../../auth_backend/config/smtp");
const transporter = nodemailer.createTransport(smtp);

class MailRepository {
  constructor() {}
  async sendMail(mail) {
    try {
      return new Promise((resolve, reject) => {
        console.log("ini transporter:",transporter);
        const infoMail = transporter.sendMail(mail, (err, info) => {
          if (err) {
            reject(err);
            console.log(err);
          } else if (info){
            resolve(info.response);
          } else {
            resolve(infoMail.response);
          }
          console.log("ini info:",info);
        });
        console.log("ini info mail:",infoMail);
        return infoMail;
      });

    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }
  }


}

module.exports = MailRepository;
