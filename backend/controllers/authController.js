const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    await authService.registerUser(email, password, first_name, last_name);
    res.status(201).json({
      status: "success",
      message: "Kayıt başarılı",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bu e-posta adresi zaten kullanılıyor veya geçersiz.",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const token = await authService.loginUser(email, password);

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    };

    if (rememberMe) {
      cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 30;
    }

    res.cookie("access_token", token, cookieOptions);
    res.status(201).json({ status: "success", message: "Giriş başarılı" });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(201).json({ status: "success", message: "Oturum kapatıldı" });
  } catch (error) {
    next(error);
  }
};
