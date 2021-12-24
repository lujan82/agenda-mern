// Configuración inicial
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// const jwt = require("jsonwebtoken");

// Capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// .env
require("dotenv").config();

// Conexión a base de datos
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.s8ub4.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDb"))
  .catch((e) => console.log(e));

// Motor de plantillas handlebars
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
app.set("view engine", "hbs");
app.set("views", __dirname + "/views"); // buscará los archivos en la carpeta views

app.use(express.static(__dirname + "/public"));

app.use(cors());

const user = "";
const emailUser = "";
const tokenUser = "";

// middleware
const verifyToken = require("./router/verifyToken");

// Rutas
app.use("/", require("./router/auth"));
app.use("/register", require("./router/register"));
app.use("/forgot", require("./router/forgot"));
app.use("/admin", verifyToken, require("./router/admin"));
app.use("/agenda", verifyToken, require("./router/agenda"));

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log("puerto", port);
});
