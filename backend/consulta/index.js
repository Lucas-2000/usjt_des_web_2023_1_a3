const express = require("express");

const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
  UsuarioCriado: (usuario) => {
    baseConsulta[usuario.idUsuario] = usuario;
  },
  AnuncioCriado: (anuncio) => {
    const anuncios = baseConsulta[anuncio.idUsuario]["anuncios"] || [];
    anuncios.push(anuncio);
    baseConsulta[anuncio.idUsuario]["anuncios"] = anuncios;
  },
};

app.get("/usuarios", (req, res) => {
  res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
  funcoes[req.body.tipo](req.body.dados);
  res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));
