const jwt = require("jsonwebtoken");
require("./auth");

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  if (!tokenUser) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(tokenUser, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

module.exports = verifyToken;
