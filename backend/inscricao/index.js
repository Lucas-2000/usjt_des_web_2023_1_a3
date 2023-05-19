const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const inscricoesNoAnuncio = {};

app.get("/inscricoes", (req, res) => {
  res.status(201).send(inscricoesNoAnuncio);
});

app.get("/usuarios/:email/inscricoes", (req, res) => {
  res.status(201).send(inscricoesNoAnuncio[req.params.email] || []);
});

app.post("/usuarios/:email/inscricoes", async (req, res) => {
  const idInscricao = uuidv4();
  const { idAnuncio, nome } = req.body;
  const { email } = req.params;
  const inscricoes = inscricoesNoAnuncio[email] || [];

  if (inscricoesNoAnuncio[email] !== undefined) {
    const inscricaoExistente = inscricoesNoAnuncio[email].find(
      (anuncio) => anuncio.idAnuncio === idAnuncio
    );
    if (inscricaoExistente !== undefined) {
      return res.status(400).send("Inscrição já existe");
    }
  }

  inscricoes.push({
    idInscricao,
    idAnuncio,
    email,
    nome,
  });
  inscricoesNoAnuncio[email] = inscricoes;

  try {
    await axios.post("http://localhost:10000/eventos", {
      tipo: "InscricaoCriada",
      dados: {
        idInscricao,
        idAnuncio,
        nome,
        email,
      },
    });

    res.status(201).send(inscricoesNoAnuncio);
  } catch (err) {
    res.status(500).send();
  }
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Inscrição. Porta 7000"));
