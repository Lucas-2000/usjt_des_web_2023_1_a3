const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

const usuarios = {};

app.post("/usuarios", (req, res) => {
  const idUsuario = uuidv4();
  const { nome, email, senha, tipo, bio, estilo, disponibilidade, link } =
    req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  usuarios[idUsuario] = {
    id: idUsuario,
    nome,
    email,
    senha: hash,
    tipo,
    bio,
    estilo,
    disponibilidade,
    link,
  };

  res.status(201).send(usuarios[idUsuario]);
});

app.get("/usuarios", (req, res) => {
  res.send(usuarios);
});

app.get("/usuarios/:email", (req, res) => {});

app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const { nome, email, senha, tipo, bio, estilo, disponibilidade, link } =
    req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  if (usuarios[id] === undefined)
    return res.status(500).send("Insira um id válido");

  if (id === usuarios[id].id) {
    usuarios[id] = {
      nome,
      email,
      senha: hash,
      tipo,
      bio,
      estilo,
      disponibilidade,
      link,
    };
    return res.status(201).send(usuarios[id]);
  } else {
    return res.status(500).send("Erro na atualização");
  }
});

app.delete("/usuarios/:id", (req, res) => {});

app.listen(4000, () => {
  console.log("Usuários executando na porta 4000");
});
