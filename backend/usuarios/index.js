const express = require("express");
const bcrypt = require("bcrypt");
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

const usuarios = [];

app.get("/usuarios", (req, res) => {
  res.send(usuarios);
});

// app.post("/usuarios", (req, res) => {
//   const idUsuario = uuidv4();
//   const { nome, email, senha, tipo, bio, estilo, disponibilidade, link } =
//     req.body;

//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(senha, salt);

//   usuarios[idUsuario] = {
//     id: idUsuario,
//     nome,
//     email,
//     senha: hash,
//     tipo,
//     bio,
//     estilo,
//     disponibilidade,
//     link,
//   };

//   res.status(201).send(usuarios[idUsuario]);
// });

app.post("/usuarios", async (req, res) => {
  try {
    const idUsuario = uuidv4();

    const emailExistente = usuarios.find(
      (usuario) => usuario.email === req.body.email
    );

    if (emailExistente) {
      return res.status(400).send("Usuário já existe");
    }

    const hashedSenha = await bcrypt.hash(req.body.senha, 10);

    const usuario = {
      id: idUsuario,
      nome: req.body.nome,
      email: req.body.email,
      senha: hashedSenha,
      tipo: req.body.tipo,
      bio: req.body.bio,
      estilo: req.body.estilo,
      disponibilidade: req.body.disponibilidade,
      link: req.body.link,
    };
    usuarios.push(usuario);
    res.status(201).send(usuarios[idUsuario]);
  } catch {
    res.status(500).send();
  }
});

app.get("/usuarios/:email/:senha", (req, res) => {});

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

app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  if (usuarios[id] === undefined)
    return res.status(500).send("Insira um id válido");

  if (id === usuarios[id].id) {
    delete usuarios[id];
    return res.status(201).send("Usuário deletado");
  } else {
    return res.status(500).send("Erro no delete");
  }
});

app.post("/usuarios/login", async (req, res) => {
  const usuario = usuarios.find((usuario) => usuario.email === req.body.email);

  if (usuario == null) {
    return res.status(400).send("Usuário não encontrado");
  }

  try {
    if (await bcrypt.compare(req.body.senha, usuario.senha)) {
      res.status(201).send("Login concluído");
    } else {
      res.status(400).send("Senha incorreta");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(4000, () => {
  console.log("Usuários executando na porta 4000");
});
