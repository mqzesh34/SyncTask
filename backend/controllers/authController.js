const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await authService.registerUser(email, password);
    res.status(201).json(User);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
    });
    res.status(200).json({ status: "success", message: "Giriş başarılı" });
  } catch (error) {
    next(error);
  }
};
