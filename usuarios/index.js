const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/usuarios", (req, res) => {});

app.get("/usuarios", (req, res) => {});

app.put("/usuarios/:id", (req, res) => {});

app.delete("/usuarios/:id", (req, res) => {});

app.listen(4000, () => {
  console.log("Usuários executando na porta 4000");
});
