const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

const issueJWT = (user) => {
  const _id = user._id;

  const expiresIn = "3 w";

  const payload = {
    sub: _id,
  };
  const signedToken = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = { issueJWT };
