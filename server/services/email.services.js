const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "maddison53@ethermail.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devdtech01@gmail.com",
    pass: "sqgs wvbp kwkn iiyg",
  },
});

const getVerificationCode = () => {
  let num = "";
  for (let i = 0; i < 4; i++) {
    num += Math.floor(Math.random() * 10);
  }

  return { code: num };
};

async function sendEmail(email) {
  const verificationCode = getVerificationCode();

  const token = jwt.sign(
    { code: verificationCode.code },
    process.env.VERIFICATION_CODE,
    {
      expiresIn: "3m",
    }
  );

  const mailOptions = {
    from: "Password Manager Team",
    to: email,
    subject: "Verification code",
    html: `<b>${verificationCode.code}</b>`,
  }

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return { code: verificationCode.code, token };
}

module.exports = sendEmail;
