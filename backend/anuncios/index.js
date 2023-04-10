const express = require("express");
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

const anuncios = [];

app.get("/anuncios", (req, res) => {
  res.send(anuncios);
});

app.post("/anuncios", (req, res) => {
  const idAnuncio = uuidv4();
  const { titulo, descricao, tipo, endereco, pagamento } = req.body;
  anuncios[idAnuncio] = {
    id: idAnuncio,
    titulo,
    descricao,
    tipo,
    endereco,
    pagamento,
  };
  res.status(201).send(anuncios[idAnuncio]);
});

app.put("/anuncios/:id", (req, res) => {
  const { id } = req.params;

  const { titulo, descricao, tipo, endereco, pagamento } = req.body;

  if (anuncios[id] === undefined)
    return res.status(500).send("Insira um id válido");

  if (id === anuncios[id].id) {
    anuncios[idAnuncio] = {
      id: idAnuncio,
      titulo,
      descricao,
      tipo,
      endereco,
      pagamento,
    };

    return res.status(201).send(anuncios[id]);
  } else {
    return res.status(500).send("Erro na atualização");
  }
});

app.delete("/anuncios/:id", (req, res) => {
  const { id } = req.params;

  if (anuncios[id] === undefined)
    return res.status(500).send("Insira um id válido");

  if (id === anuncios[id].id) {
    delete anuncios[id];
    return res.status(201).send("Anuncio deletado");
  } else {
    return res.status(500).send("Erro no delete");
  }
});

app.listen(5000, () => {
  console.log("Anuncios executando na porta 5000");
});
