const userService = require("../services/userService");

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUserProfile(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
