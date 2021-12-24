const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// constraseña
const bcrypt = require("bcrypt");

// Validaciones form
const Joi = require("@hapi/joi");

// Register
const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  // validaciones usuario
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({
      mensaje: error.details[0].message,
    });
  }

  // Email existe
  const existeEmail = await User.findOne({
    email: req.body.email,
  });

  if (existeEmail) {
    return res.status(400).json({
      error: true,
      mensaje: "El email ya esta registrado",
    });
  }

  // hash password
  const saltRounds = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltRounds);

  const token = await jwt.sign(
    {
      name: req.body.name,
      email: req.body.email,
      password: password,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const newUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    token,
  });

  tokenUser = token;
  user = newUser;
  emailUser = req.body.email;

  try {
    const userDB = await newUser.save();
    tokenUser = userDB.token;

    res.json({
      error: "ok",
      mensaje: "has sido registrado correctamente",
    });

    res.redirect("/agenda");
  } catch (error) {
    console.error(error.response);
  }
});

module.exports = router;
