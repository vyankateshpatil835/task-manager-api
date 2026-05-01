const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.jwt_secret, {
    expiresIn: process.env.jwt_expires,
  });
};

module.exports = generateToken;
