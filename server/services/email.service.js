const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

const sendTestEmail = async (recipientEmail) => {
  const mailOptions = {
    from: `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`,
    to: recipientEmail,
    subject: "Clear Skin - Test Email",
    text: "This is a test email from the Clear Skin backend. Brevo SMTP is working successfully.",
  };

  const info = await emailTransporter.sendMail(mailOptions);

  return info;
};

module.exports = {
  emailTransporter,
  sendTestEmail,
};