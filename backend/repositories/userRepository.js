const db = require("../db");

exports.findUserByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
exports.findUserById = async (userId) => {
  const { rows } = await db.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return rows[0];
};

exports.createUser = async ({ email, password_hash }) => {
  const { rows } = await db.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING user_id, email",
    [email, password_hash]
  );
  return rows[0];
};
