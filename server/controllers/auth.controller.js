const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const {
cookieOptions,
clearCookieOptions,
} = require("../helpers/cookie.helper");

const register = asyncHandler(async (req, res) => {
const result = await authService.registerUser(req.body);

res.status(201).json(
new ApiResponse(
201,
"User Registered Successfully",
result
)
);
});

const login = asyncHandler(async (req, res) => {
const { email, password } = req.body;

const result = await authService.loginUser(
email,
password
);

res
.cookie("token", result.token, cookieOptions)
.status(200)
.json(
new ApiResponse(
200,
"Login Successful",
{ user: result.user }
)
);
});

const getMe = asyncHandler(async (req, res) => {
const user = await authService.getCurrentUser(req.user._id);

res.status(200).json(
new ApiResponse(
200,
"User fetched successfully",
user
)
);
});

const logout = asyncHandler(async (req, res) => {
await authService.logoutUser();

res
.clearCookie("token", clearCookieOptions)
.status(200)
.json(
new ApiResponse(
200,
"Logout successful"
)
);
});

const forgotPassword = asyncHandler(async (req, res) => {
const { email } = req.body;

const { resetToken } =
await authService.forgotPassword(email);

// Development only
console.log(
`Reset Password Link: http://localhost:5173/reset-password/${resetToken}`
);

res.status(200).json(
new ApiResponse(
200,
"Password reset link generated successfully"
)
);
});

const resetPassword = asyncHandler(async (req, res) => {
const { token } = req.params;
const { password } = req.body;

await authService.resetPassword(
token,
password
);

res.status(200).json(
new ApiResponse(
200,
"Password reset successful"
)
);
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
const { verificationToken } =
await authService.sendVerificationEmail(req.user._id);

// Development only
console.log(
`Verify Email Link: http://localhost:5173/verify-email/${verificationToken}`
);

res.status(200).json(
new ApiResponse(
200,
"Verification link generated successfully"
)
);
});

const verifyEmail = asyncHandler(async (req, res) => {
const { token } = req.params;

await authService.verifyEmail(token);

res.status(200).json(
new ApiResponse(
200,
"Email verified successfully"
)
);
});

module.exports = {
register,
login,
getMe,
logout,
forgotPassword,
resetPassword,
sendVerificationEmail,
verifyEmail,
};
