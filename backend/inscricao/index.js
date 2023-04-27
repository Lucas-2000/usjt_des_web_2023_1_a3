const express = require("express");
const axios = require("axios");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const inscricoesNoAnuncio = {};

app.get("/inscricoes", (req, res) => {
  res.status(201).send(inscricoesNoAnuncio);
});

app.get("/usuarios/:idUsuario/inscricoes", (req, res) => {
  res.status(201).send(inscricoesNoAnuncio[req.params.idUsuario] || []);
});

app.post("/usuarios/:idUsuario/inscricoes", async (req, res) => {
  const idInscricao = uuidv4();
  const { idAnuncio, nome, email } = req.body;
  const { idUsuario } = req.params;
  const inscricoes = inscricoesNoAnuncio[idUsuario] || [];
  inscricoes.push({
    idInscricao,
    idAnuncio,
    idUsuario,
    nome,
    email,
  });
  inscricoesNoAnuncio[idUsuario] = inscricoes;

  await axios.post("http://localhost:10000/eventos", {
    tipo: "InscricaoCriada",
    dados: {
      idInscricao,
      idAnuncio,
      idUsuario,
      nome,
      email,
    },
  });

  res.status(201).send(inscricoesNoAnuncio);
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Inscrição. Porta 7000"));
