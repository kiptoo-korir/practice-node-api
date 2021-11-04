const { createUser } = require("./authDAL");
const { generateHash } = require("./authService");

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

module.exports = {
  register,
};
