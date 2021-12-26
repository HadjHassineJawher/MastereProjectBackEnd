const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config/.env" });

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_USER_PASSWORD = process.env.EMAIL_USER_PASSWORD;

const EmailMessage = async (UserEmail) => {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    logger: false,
    debug: false,
    secureConnection: false,
    auth: {
      user: `${EMAIL_USER}`,
      pass: `${EMAIL_USER_PASSWORD}`,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  const Options = {
    from: `Mpdam Events 👻 : ${EMAIL_USER}`,
    to: UserEmail,
    subject: "Account Creation",
    text: "Your account has been Successfully Created",
    html: `<font color="black">
                  <center>
                      <h2> Congratulations Your account has been Successfully Created </h2><br>
                  </center>
            </font>`,
  };

  Transporter.sendMail(Options, (err) => {
    if (!err) {
      console.log(`Mail has been Send to ${UserEmail}.`);
      Transporter.close();
    } else {
      console.log(`Mail sending Failed .. !`);
      Transporter.close();
    }
  });
};
module.exports = { EmailMessage };
