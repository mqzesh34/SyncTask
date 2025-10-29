const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error("Giriş yapmalısınız (Token bulunamadı).");
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    next(error);
  }
};
