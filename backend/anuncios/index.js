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

const anunciosPorUsuario = {};

app.get("/anuncios", (req, res) => {
  res.status(201).send(anunciosPorUsuario);
});

app.get("/usuarios/:id/anuncios", (req, res) => {
  res.status(201).send(anunciosPorUsuario[req.params.id] || []);
});

app.post("/usuarios/:id/anuncios", async (req, res) => {
  const idAnuncio = uuidv4();
  const { titulo, descricao, tipo, endereco, pagamento } = req.body;
  const anuncios = anunciosPorUsuario[req.params.id] || [];
  anuncios.push({
    idAnuncio,
    titulo,
    descricao,
    tipo,
    endereco,
    pagamento,
    idUsuario: req.params.id,
  });
  anunciosPorUsuario[req.params.id] = anuncios;

  await axios.post("http://localhost:10000/eventos", {
    tipo: "AnuncioCriado",
    dados: {
      idAnuncio,
      titulo,
      descricao,
      tipo,
      endereco,
      pagamento,
      idUsuario: req.params.id,
    },
  });

  res.status(201).send(anunciosPorUsuario);
});

// app.put("/usuarios/:id_usuario/anuncios/:id_anuncio", (req, res) => {
//   const { id_usuario, id_anuncio } = req.params;

//   const { titulo, descricao, tipo, endereco, pagamento } = req.body;

//   if (anunciosPorUsuario[id_usuario] === undefined)
//     return res.status(500).send("Insira um id válido");

//   if (id_anuncio === anunciosPorUsuario[id_usuario].id) {
//     anunciosPorUsuario[id_usuario] = {
//       titulo,
//       descricao,
//       tipo,
//       endereco,
//       pagamento,
//     };

//     return res.status(201).send(anunciosPorUsuario[id_usuario]);
//   } else {
//     return res.status(500).send("Erro na atualização");
//   }
// });

// app.delete("/usuarios/:id/anuncios/:id", (req, res) => {
//   const { id } = req.params;

//   if (anuncios[id] === undefined)
//     return res.status(500).send("Insira um id válido");

//   if (id === anuncios[id].id) {
//     delete anuncios[id];
//     return res.status(201).send("Anuncio deletado");
//   } else {
//     return res.status(500).send("Erro no delete");
//   }
// });

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

app.listen(5000, () => {
  console.log("Anuncios executando na porta 5000");
});
