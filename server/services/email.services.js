const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "maddison53@ethermail.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const randomNumber = () => {
  let num = "";
  for (let i = 0; i < 5; i++) {
    num += Math.floor(Math.random());
  }

  return num;
};

async function sendEmail(email) {
  const info = await transporter.sendMail({
    from: "Password Manager Team",
    to: email,
    subject: "Verification code",
    html: `<b>${randomNumber}</b>`,
  });

  console.log(info.messageId);
}

module.exports = sendEmail;
