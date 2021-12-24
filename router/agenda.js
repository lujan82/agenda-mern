const express = require("express");
const router = express.Router();
const Agenda = require("../models/agenda");

// recibir datos de la base de datos
router.get("/", async (req, res) => {
  try {
    const listAgenda = await Agenda.find({ emailUser: emailUser }).sort({
      name: 1,
    });

    res.render("agenda", {
      listAgenda,
      user,
    });
  } catch (error) {
    console.error(error.response);
  }
});

router.get("/crear", async (req, res) => {
  res.render("crear");
});

// Post
router.post("/", async (req, res) => {
  const body = req.body;
  // añadimos el emailUser al objeto
  body.emailUser = emailUser;

  try {
    await Agenda.create(body);
    res.redirect("/agenda");
  } catch (error) {
    console.error(error.response);
  }
});

// select id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const agendaDB = await Agenda.findOne({
      _id: id,
    });

    res.render("detalle", {
      agenda: agendaDB,
      error: false,
    });
  } catch (error) {
    res.render("detalle", {
      error: true,
      mensaje: "No se encuentra el documento...",
    });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const agendaDB = await Agenda.findByIdAndDelete({
      _id: id,
    });
    if (!agendaDB) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "Eliminado",
      });
    }
  } catch (error) {
    console.error(error.response);
  }
});

// Update
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.emailUser = emailUser;

  try {
    const agendaDB = await Agenda.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });

    res.json({
      estado: true,
      mensaje: "Contacto editado",
    });
  } catch (error) {
    res.json({
      estado: false,
      mensaje: "Contacto falla",
    });
  }
});

module.exports = router;
