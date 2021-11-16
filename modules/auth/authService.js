const bcrypt = require("bcryptjs");

function generateHash(password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

function checkPassword(password, hashedPassword) {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateHash,
  checkPassword,
};
