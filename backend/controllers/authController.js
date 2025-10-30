const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
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
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
    });
    res.status(201).json({ status: "success", message: "Giriş başarılı" });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("access_token", "", {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 10 * 1000),
      maxAge: 0,
    });

    res.status(201).json({ status: "success", message: "Oturum kapatıldı" });
  } catch (error) {
    next(error);
  }
};
