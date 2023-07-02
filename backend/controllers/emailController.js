const nodemailer = require("nodemailer");

const sendEmail = async (info, email) => {
  // let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  let data = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Hello ✔",
    text: info.text || "Hello world?",
    html: info.html || "<b>Hello world?</b>",
  };

  transporter
    .sendMail(data)
    .then((info) => {
      console.log(info)
      // console.log(nodemailer.getTestMessageUrl(info));
      return true;
    })
    .catch((err) => {
      return false;
    });
};

module.exports = sendEmail;
