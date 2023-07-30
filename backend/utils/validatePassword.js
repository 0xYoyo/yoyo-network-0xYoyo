const bcrypt = require("bcryptjs");

const validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log(isValid);
  return isValid;
};

module.exports = { validatePassword };
