const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Validaciones form
const Joi = require("@hapi/joi");

// Login
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

// Rutas
router.get("/", (req, res) => {
  res.render("index");
});

// Login
router.post("/", async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error)
    return res.status(400).json({
      error: error.details[0].message,
    });

  user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) return; // res.json({ success: true, message: "all right" });
    if (err)
      return res.json({ success: false, error: "Credenciales no validas" });
  });

  //Token
  const token = await jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  User.findByIdAndUpdate(
    user.id,
    { $set: { token } },
    {
      useFindAndModify: false,
    }
  );

  tokenUser = token;
  emailUser = req.body.email;

  res.header("Authorization", token);
  // res.setHeader("Authorization", token);
  res.json({
    mensaje: "token ok",
    name: user.name,
    email: req.body.email,
    id: user._id,
    token,
  });

  // res.redirect("/agenda");
});

module.exports = router;
