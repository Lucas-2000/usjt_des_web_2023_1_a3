const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const eventos = [];

app.post("/eventos", async (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  console.log(evento);
  try {
    //envia o evento para o microsserviço de usuários
    await axios.post("http://localhost:4000/eventos", evento);
  } catch (err) {}
  try {
    //envia o evento para o microsserviço de anuncios
    awaitaxios.post("http://localhost:5000/eventos", evento);
  } catch (err) {}
  try {
    //envia o evento para o microsserviço de consulta
    await axios.post("http://localhost:6000/eventos", evento);
  } catch (err) {}
  try {
    //envia o evento para o microsservico de inscrição
    await axios.post("http://localhost:7000/eventos", evento);
  } catch (err) {}
  res.status(200).send({ msg: "ok" });
});

app.get("/eventos", (req, res) => {
  res.send(eventos);
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000.");
});
