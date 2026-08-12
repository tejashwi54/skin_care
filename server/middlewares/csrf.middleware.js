const { doubleCsrf } = require("csrf-csrf");

const {
  invalidCsrfTokenError,
  generateCsrfToken,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,

  getSessionIdentifier: (req) =>
    req.cookies?.token || req.ip,

  cookieName: "csrf-token",

  cookieOptions: {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  },
});

module.exports = {
  invalidCsrfTokenError,
  generateCsrfToken,
  doubleCsrfProtection,
};