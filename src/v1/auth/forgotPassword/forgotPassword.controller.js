const bcrypt = require("bcryptjs");
const Boom = require("@hapi/boom");
const {
  forgotPasswordSchema,
  sendOtpPasswordSchema,
} = require("./forgotPassword.validation");
const { findUserEmail, setPassword } = require("./forgotPassword.services");
const {
  successResponse,
  ServerError,
  ServerSuccess,
} = require("../../../utils/apiResponse");
const { sendEmail, sendOtpEmail } = require("../../../utils/sendEmail");
const { passwordGenerate, generateOtp } = require("../../../utils/generatePassword");
const redis = require("../../../services/database/redis");

// function for send otp
const sendOtp = async (req, res, next) => {
  try {
    const email = req.query.email;
    const existingUser = await findUserEmail(email);
    if (existingUser.length > 0) {
      const otp = generateOtp();
      const data = JSON.stringify({ emailId: email, otpPass: otp });
      await redis.set(email, data, "EX", 600);

      sendOtpEmail(email, otp);
      const successMessage = await successResponse(
        true,
        200,
        ServerSuccess.success.otpSent
      );
      res.send(successMessage);
    } else {
      console.error("User does not exist in the database.");
      throw Boom.preconditionFailed(ServerError.error.userNotExist);
    }
  } catch (error) {
    console.error("Error sending OTP email:", error); // Log error details
    next(error);
  }
};

// function for forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const userData = await redis.get(email);

    if (userData) {
      const userInfo = JSON.parse(userData);
      if (userInfo.emailId == email && userInfo.otpPass == otp) {
        const password = passwordGenerate();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userInfo = await findUserEmail(email);
        if (userInfo.length > 0) {
          await setPassword(email, hashedPassword);
          sendEmail(email, password);

          const message = {
            message: ServerSuccess.success.successfullyForgot,
          };
          await redis.del(email);
          const successMessage = await successResponse(true, 200, message);
          res.status(200).json(successMessage);
        } else {
          throw Boom.preconditionFailed(ServerError.error.userNotExist);
        }
      } else {
        throw Boom.preconditionFailed(ServerError.error.otpDoesNtMatch);
      }
    } else {
      throw Boom.preconditionFailed(ServerError.error.otpDoesNtMatch);
    }
  } catch (error) {
    next(error);
  }
};

// function for validate email for forgot
const validateEmailForgot = (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) {
    const firstError = error.details[0];
    throw Boom.badRequest(firstError.message);
  }

  next();
};

// function for sendOtpValidation
const sendOtpEmailValidation = (req, res, next) => {
  const { error } = sendOtpPasswordSchema.validate(req.query);
  if (error) {
    const firstError = error.details[0];
    throw Boom.badRequest(firstError.message);
  }
  next();
};

module.exports = {
  forgotPassword,
  validateEmailForgot,
  sendOtp,
  sendOtpEmailValidation,
};

// await transporter.sendMail({
//   from: '"Harshal Certificate Manager 👻" <hrp3102002@gmail.com>',
//   to: email,
//   subject: "Your OTP Code",
//   text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
// });

// const successMessage = await successResponse(true, 200, {
//   message: ServerSuccess.success.otpSent,
// });

// await transporter.sendMail({
//   from: '"Harshal Certificate Manager 👻" <hrp3102002@gmail.com>',
//   to: email,
//   subject: "Your password",
//   text: `Your new password is ${password}.`,
// });

// const successMessage = await successResponse(
//   true,
//   200,
//   ServerSuccess.success.otpSent
// );
