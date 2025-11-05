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

exports.createUser = async (email, password_hash, first_name, last_name) => {
  const { rows } = await db.query(
    "INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING user_id, email, first_name, last_name",
    [email, password_hash, first_name, last_name]
  );
  return rows[0];
};
