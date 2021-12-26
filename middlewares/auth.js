const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const JWT_KEY = process.env.JWT_KEY;

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, `${JWT_KEY}`, (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid." });
      }
      req.data = data;
      console.log(data);
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authentificated .. !" });
    return;
  }
};

module.exports = { verify };
