const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ServerError } = require("../../utils/apiResponse");

const secretKey = process.env.SECRET_KEY;

const signToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, sessionId: user.sessionId },
    secretKey,
    { expiresIn: "7d" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw boom.unauthorized(ServerError.error.invalidToken);
  }
};

module.exports = { signToken, verifyToken };
