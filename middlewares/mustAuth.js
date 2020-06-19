const JWT_PASSWORD = 'secret'
const jwt = require("jsonwebtoken");
const bearerToken = require("express-bearer-token");



function mustAuth() {
  return (req, res, next) => {
    console.info(req.token)
    if (!req.token) {
      res.status(401).json({ message: "Necesitas un token JWT" });
      return;
    }
    try {
      let token = req.token;
      let user = jwt.verify(token, JWT_PASSWORD);
      req.user = user;
    } catch (err) {
      res.status(401).json({ message: "Token inválido"});
      return;
    }
    next();
  };
}

module.exports = mustAuth;