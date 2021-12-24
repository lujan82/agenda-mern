const router = require("express").Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.render("forgot");
});

router.post("/", async (req, res) => {
  // Email existe
  const existeEmail = await User.findOne({
    email: req.body.email,
  });

  if (existeEmail) {
    var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "lujilujan@hotmail.com",
        pass: "Carlos1982",
      },
    });

    var mailOptions = {
      from: "Contacts book CRUD APP",
      to: existeEmail.email,
      subject: "recuperar contraseña",
      text: "Su contraseña es : " + existeEmail.password,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
      return res.status(200).json({
        mensaje: "En breve recibirá un correo con su contraseña, mira en spam",
      });
    });

    console.log("enviado");
    return res.json({
      mensaje: "En breves recibirá un correo con su contraseña",
    });
  } else {
    return res.json({
      mensaje: "El email aún no esta registrado",
    });
  }
});

module.exports = router;
