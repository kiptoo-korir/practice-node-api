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

module.exports = {
  getByEmail,
};
