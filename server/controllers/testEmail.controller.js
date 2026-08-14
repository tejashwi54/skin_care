const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const { sendEmail } = require("../utils/mailer");

const testEmail = asyncHandler(async (req, res) => {
  const recipientEmail = req.query.email;

  if (!recipientEmail) {
    throw new ApiError(
      400,
      "Email address is required"
    );
  }

  try {
    await sendEmail({
      to: recipientEmail,
      subject: "Clear Skin - Test Email",
      html: `
        <div>
          <h2>Clear Skin</h2>
          <p>This is a test email from the Clear Skin backend.</p>
          <p>Brevo SMTP is working successfully.</p>
        </div>
      `,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        "Test email sent successfully"
      )
    );
  } catch (error) {
    logger.error(
      `Test email error: ${error.message}`
    );

    throw new ApiError(
      500,
      "Failed to send test email"
    );
  }
});

module.exports = {
  testEmail,
};