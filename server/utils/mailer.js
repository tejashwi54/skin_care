const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
};

// Verify SMTP connection only outside Jest tests
if (process.env.NODE_ENV !== "test") {
  transporter.verify((error) => {
    if (error) {
      console.error(
        "❌ Brevo SMTP connection failed:",
        error.message
      );
    } else {
      console.log("✅ Brevo SMTP server is ready");
    }
  });
}

module.exports = {
  sendEmail,
};