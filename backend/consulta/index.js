const express = require("express");
const axios = require("axios");

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
  InscricaoCriada: (inscricao) => {
    const inscricoes = baseConsulta[inscricao.idUsuario]["inscricoes"] || [];
    inscricoes.push(inscricao);
    baseConsulta[inscricao.idUsuario]["inscricoes"] = inscricoes;
  },
};

app.get("/usuarios", (req, res) => {
  res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}
  res.status(200).send(baseConsulta);
});

app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const resp = await axios.get("http://localhost:10000/eventos");
  //axios entrega os dados na propriedade data
  resp.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (err) {}
  });
});
