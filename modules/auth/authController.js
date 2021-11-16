const { createUser, getHashedPassword, getByEmail } = require("./authDAL");
const { generateHash, checkPassword } = require("./authService");
const { appkey } = require("../../utils/config");
const jwt = require("jsonwebtoken");

async function register(user) {
  try {
    const { name, email, password } = user;
    const hashedPassword = generateHash(password);
    const newUser = await createUser([name, email, hashedPassword]);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function signIn(user) {
  try {
    const { email, password } = user;
    const result = await getByEmail(email);
    const { id, password: hashedPassword } = result[0];

    const check = checkPassword(password, hashedPassword);

    if (check) {
      return jwt.sign({ id }, appkey, { expiresIn: 3600 });
    }

    return undefined;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  signIn,
};
