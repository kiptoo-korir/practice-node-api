const { createUser } = require("./authDAL");

async function register(user) {
  try {
    const userArray = Object.values(user);
    const newUser = await createUser(userArray);
    // Once user is created, create token for user
  } catch (error) {
    throw error;
  }
}
