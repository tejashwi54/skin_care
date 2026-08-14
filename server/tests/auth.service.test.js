const crypto = require("crypto");

// Mock mailer BEFORE importing auth service
jest.mock("../utils/mailer", () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

// Mock token generation
jest.mock("../helpers/token.helper", () => {
  return jest.fn(() => "mock-jwt-token");
});

const authService = require("../services/auth.service");
const authRepository = require("../repositories/auth.repository");
const { sendEmail } = require("../utils/mailer");

jest.mock("../repositories/auth.repository");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================================
  // REGISTER
  // =====================================================

  describe("registerUser", () => {
    it("should register a new user successfully", async () => {
      const user = {
        _id: "user123",
        name: "Test User",
        email: "test@gmail.com",
        role: "user",
        avatar: "",
        isVerified: false,

        emailVerificationOtpHash: null,
        emailVerificationOtpExpires: null,
        emailVerificationOtpAttempts: 0,
        emailVerificationLastSentAt: null,

        save: jest.fn().mockResolvedValue(true),
        deleteOne: jest.fn().mockResolvedValue(true),
      };

      authRepository.findUserByEmail.mockResolvedValue(null);

      authRepository.createUser.mockResolvedValue(user);

      const result = await authService.registerUser({
        name: "Test User",
        email: "TEST@GMAIL.COM",
        password: "Password@123",
      });

      expect(
        authRepository.findUserByEmail
      ).toHaveBeenCalledWith("test@gmail.com");

      expect(
        authRepository.createUser
      ).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@gmail.com",
        password: "Password@123",
        isVerified: false,
      });

      expect(user.save).toHaveBeenCalled();

      expect(sendEmail).toHaveBeenCalledTimes(1);

      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "test@gmail.com",
          subject: "Clear Skin - Verify Your Email",
        })
      );

      expect(result).toEqual({
        _id: "user123",
        name: "Test User",
        email: "test@gmail.com",
        role: "user",
        avatar: "",
        isVerified: false,
      });
    });

    it("should reject registration if user already exists", async () => {
      authRepository.findUserByEmail.mockResolvedValue({
        _id: "existing-user",
        email: "test@gmail.com",
      });

      await expect(
        authService.registerUser({
          name: "Test User",
          email: "test@gmail.com",
          password: "Password@123",
        })
      ).rejects.toMatchObject({
        statusCode: 409,
        message: "User already exists",
      });

      expect(
        authRepository.createUser
      ).not.toHaveBeenCalled();

      expect(sendEmail).not.toHaveBeenCalled();
    });
  });

  // =====================================================
  // LOGIN
  // =====================================================

  describe("loginUser", () => {
    const createLoginUser = ({
      isVerified = true,
      passwordMatch = true,
    } = {}) => ({
      _id: "user123",
      name: "Test User",
      email: "test@gmail.com",
      role: "user",
      avatar: "",
      isVerified,

      comparePassword: jest
        .fn()
        .mockResolvedValue(passwordMatch),
    });

    it("should login a verified user successfully", async () => {
      const user = createLoginUser();

      authRepository.findUserByEmail.mockResolvedValue(user);

      const result = await authService.loginUser(
        "test@gmail.com",
        "Password@123"
      );

      expect(
        authRepository.findUserByEmail
      ).toHaveBeenCalledWith("test@gmail.com");

      expect(
        user.comparePassword
      ).toHaveBeenCalledWith("Password@123");

      expect(result).toEqual({
        user: {
          _id: "user123",
          name: "Test User",
          email: "test@gmail.com",
          role: "user",
          avatar: "",
          isVerified: true,
        },
        token: "mock-jwt-token",
      });
    });

    it("should reject login when user does not exist", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);

      await expect(
        authService.loginUser(
          "unknown@gmail.com",
          "Password@123"
        )
      ).rejects.toMatchObject({
        statusCode: 401,
        message: "Invalid email or password",
      });
    });

    it("should reject login with incorrect password", async () => {
      const user = createLoginUser({
        passwordMatch: false,
      });

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.loginUser(
          "test@gmail.com",
          "WrongPassword"
        )
      ).rejects.toMatchObject({
        statusCode: 401,
        message: "Invalid email or password",
      });
    });

    it("should reject login when email is not verified", async () => {
      const user = createLoginUser({
        isVerified: false,
      });

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.loginUser(
          "test@gmail.com",
          "Password@123"
        )
      ).rejects.toMatchObject({
        statusCode: 403,
        message:
          "Please verify your email before logging in",
      });
    });
  });

  // =====================================================
  // EMAIL VERIFICATION
  // =====================================================

  describe("verifyEmailOtp", () => {
    const createVerificationUser = ({
      otp = "123456",
      expired = false,
      attempts = 0,
    } = {}) => ({
      _id: "user123",
      name: "Test User",
      email: "test@gmail.com",
      role: "user",
      avatar: "",
      isVerified: false,

      emailVerificationOtpHash:
        crypto
          .createHash("sha256")
          .update(otp)
          .digest("hex"),

      emailVerificationOtpExpires: new Date(
        expired
          ? Date.now() - 1000
          : Date.now() + 10 * 60 * 1000
      ),

      emailVerificationOtpAttempts: attempts,

      emailVerificationLastSentAt: new Date(),

      save: jest.fn().mockResolvedValue(true),
    });

    it("should verify email using correct OTP", async () => {
      const user = createVerificationUser();

      authRepository.findUserByEmail.mockResolvedValue(user);

      const result =
        await authService.verifyEmailOtp(
          "TEST@GMAIL.COM",
          "123456"
        );

      expect(user.isVerified).toBe(true);

      expect(
        user.emailVerificationOtpHash
      ).toBeUndefined();

      expect(
        user.emailVerificationOtpExpires
      ).toBeUndefined();

      expect(user.save).toHaveBeenCalled();

      expect(result).toEqual({
        user: {
          _id: "user123",
          name: "Test User",
          email: "test@gmail.com",
          role: "user",
          avatar: "",
          isVerified: true,
        },
        token: "mock-jwt-token",
      });
    });

    it("should reject an incorrect OTP", async () => {
      const user = createVerificationUser();

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.verifyEmailOtp(
          "test@gmail.com",
          "999999"
        )
      ).rejects.toMatchObject({
        statusCode: 400,
        message: "Invalid verification code",
      });

      expect(
        user.emailVerificationOtpAttempts
      ).toBe(1);

      expect(user.save).toHaveBeenCalled();
    });

    it("should reject an expired OTP", async () => {
      const user = createVerificationUser({
        expired: true,
      });

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.verifyEmailOtp(
          "test@gmail.com",
          "123456"
        )
      ).rejects.toMatchObject({
        statusCode: 400,
        message:
          "Verification code has expired. Please request a new code.",
      });
    });

    it("should reject OTP after maximum attempts", async () => {
      const user = createVerificationUser({
        attempts: 5,
      });

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.verifyEmailOtp(
          "test@gmail.com",
          "123456"
        )
      ).rejects.toMatchObject({
        statusCode: 429,
        message:
          "Too many incorrect attempts. Please request a new code.",
      });
    });
  });

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  describe("forgotPassword", () => {
    it("should send password reset OTP for existing user", async () => {
      const user = {
        _id: "user123",
        name: "Test User",
        email: "test@gmail.com",

        passwordResetOtpHash: null,
        passwordResetOtpExpires: null,
        passwordResetOtpAttempts: 0,
        passwordResetLastSentAt: null,

        passwordResetTokenHash: "old-token",
        passwordResetTokenExpires: new Date(),

        save: jest.fn().mockResolvedValue(true),
      };

      authRepository.findUserByEmail.mockResolvedValue(user);

      const result =
        await authService.forgotPassword(
          "TEST@GMAIL.COM"
        );

      expect(result).toBe(true);

      expect(user.save).toHaveBeenCalled();

      expect(
        user.passwordResetOtpHash
      ).toBeTruthy();

      expect(
        user.passwordResetOtpExpires
      ).toBeInstanceOf(Date);

      expect(
        user.passwordResetOtpAttempts
      ).toBe(0);

      expect(
        user.passwordResetTokenHash
      ).toBeUndefined();

      expect(
        user.passwordResetTokenExpires
      ).toBeUndefined();

      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "test@gmail.com",
          subject:
            "Clear Skin - Password Reset Code",
        })
      );
    });

    it("should return success even when email does not exist", async () => {
      authRepository.findUserByEmail.mockResolvedValue(null);

      const result =
        await authService.forgotPassword(
          "unknown@gmail.com"
        );

      expect(result).toBe(true);

      expect(sendEmail).not.toHaveBeenCalled();
    });
  });

  // =====================================================
  // PASSWORD RESET OTP
  // =====================================================

  describe("verifyResetOtp", () => {
    it("should verify reset OTP and generate reset token", async () => {
      const user = {
        email: "test@gmail.com",

        passwordResetOtpHash:
          crypto
            .createHash("sha256")
            .update("123456")
            .digest("hex"),

        passwordResetOtpExpires: new Date(
          Date.now() + 10 * 60 * 1000
        ),

        passwordResetOtpAttempts: 0,

        passwordResetTokenHash: undefined,
        passwordResetTokenExpires: undefined,

        save: jest.fn().mockResolvedValue(true),
      };

      authRepository.findUserByEmail.mockResolvedValue(user);

      const result =
        await authService.verifyResetOtp(
          "test@gmail.com",
          "123456"
        );

      expect(result.resetToken).toBeTruthy();

      expect(result.resetToken).toHaveLength(64);

      expect(
        user.passwordResetTokenHash
      ).toBeTruthy();

      expect(
        user.passwordResetTokenExpires
      ).toBeInstanceOf(Date);

      expect(
        user.passwordResetOtpHash
      ).toBeUndefined();

      expect(
        user.passwordResetOtpExpires
      ).toBeUndefined();

      expect(user.save).toHaveBeenCalled();
    });

    it("should reject an incorrect reset OTP", async () => {
      const user = {
        passwordResetOtpHash:
          crypto
            .createHash("sha256")
            .update("123456")
            .digest("hex"),

        passwordResetOtpExpires: new Date(
          Date.now() + 10 * 60 * 1000
        ),

        passwordResetOtpAttempts: 0,

        save: jest.fn().mockResolvedValue(true),
      };

      authRepository.findUserByEmail.mockResolvedValue(user);

      await expect(
        authService.verifyResetOtp(
          "test@gmail.com",
          "999999"
        )
      ).rejects.toMatchObject({
        statusCode: 400,
        message: "Invalid verification code",
      });

      expect(
        user.passwordResetOtpAttempts
      ).toBe(1);
    });
  });

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  describe("resetPassword", () => {
    it("should reset password using a valid reset token", async () => {
      const resetToken = "valid-reset-token";

      const user = {
        password: "OldPassword@123",

        passwordResetTokenExpires:
          new Date(Date.now() + 10 * 60 * 1000),

        passwordResetOtpHash: "old-otp",
        passwordResetOtpExpires: new Date(),
        passwordResetOtpAttempts: 2,
        passwordResetLastSentAt: new Date(),

        passwordResetTokenHash:
          crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex"),

        save: jest.fn().mockResolvedValue(true),
      };

      authRepository.findUserByResetTokenHash.mockResolvedValue(
        user
      );

      const result =
        await authService.resetPassword(
          resetToken,
          "NewPassword@123"
        );

      expect(result).toBe(true);

      expect(user.password).toBe(
        "NewPassword@123"
      );

      expect(
        user.passwordResetTokenHash
      ).toBeUndefined();

      expect(
        user.passwordResetTokenExpires
      ).toBeUndefined();

      expect(
        user.passwordResetOtpHash
      ).toBeUndefined();

      expect(
        user.passwordResetOtpExpires
      ).toBeUndefined();

      expect(
        user.passwordResetOtpAttempts
      ).toBe(0);

      expect(user.save).toHaveBeenCalled();
    });

    it("should reject an invalid reset token", async () => {
      authRepository.findUserByResetTokenHash.mockResolvedValue(
        null
      );

      await expect(
        authService.resetPassword(
          "invalid-token",
          "NewPassword@123"
        )
      ).rejects.toMatchObject({
        statusCode: 400,
        message:
          "Password reset session is invalid or has expired",
      });
    });
  });
});