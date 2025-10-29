const userRepository = require("../repositories/userRepository");

exports.getUserProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }
  delete user.password_hash;
  return user;
};
