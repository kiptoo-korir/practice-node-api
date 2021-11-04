const db = require("../../db");

async function getByEmail(email) {
  try {
    const query = "SELECT * FROM users WHERE email = $1 LIMIT 1";
    const { rows: user } = await db.query(query, [email]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    const timeNow = new Date();
    const query =
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows: newUser } = await db.query(query, [
      ...user,
      timeNow,
      timeNow,
    ]);
    return newUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getByEmail,
  createUser,
};
