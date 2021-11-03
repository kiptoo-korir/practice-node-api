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
    const query =
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const { rows: user } = await db.query(query, user);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getByEmail,
  createUser,
};
