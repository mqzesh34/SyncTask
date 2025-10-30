const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/teams", require("./routes/teamRoute"));
app.use("/api/teams", require("./routes/taskRoute"));

app.use((err, req, res, next) => {
  console.error("Bir hata oluştu:", err.stack);
  res
    .status(400)
    .json({ message: err.message || "Beklenmeyen bir sunucu hatası oluştu." });
});

app.listen(port, () => {
  console.log("Sunucu " + port + " portunda çalışıyor");
});
