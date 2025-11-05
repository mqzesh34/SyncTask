const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (email, password, first_name, last_name) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Bu email zaten kayıtlı.");
  }

  const password_hash = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser(
    email,
    password_hash,
    first_name,
    last_name
  );

  return newUser;
};

exports.loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Email veya şifre hatalı.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Email veya şifre hatalı.");
  }
  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
  return token;
};
