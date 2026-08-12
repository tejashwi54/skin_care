const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
};

module.exports = {
  sendEmail,
};

transporter.verify((error) => {
  if (error) {
    console.error(
      "❌ Mail server connection failed:",
      error.message
    );
  } else {
    console.log("✅ Mail server is ready");
  }
});