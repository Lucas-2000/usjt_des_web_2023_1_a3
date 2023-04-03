import React, { useState } from "react";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const [biografia, setBiografia] = useState("");
  const [estilo, setEstilo] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [link, setLink] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();

    fetch("http://localhost:4000/usuarios", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        senha,
        tipo,
        biografia,
        estilo,
        disponibilidade,
        link,
      }),
    }).then((res) => {
      console.log(res);
      return res;
    });
  }

  return (
    <div>
      <main>
        <form onSubmit={handleSubmitForm}>
          <h1>Faça seu cadastro</h1>
          <label>Nome:</label>
          <input type="text" onChange={(e) => setNome(e.target.value)} />
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Senha:</label>
          <input type="password" onChange={(e) => setSenha(e.target.value)} />
          <label>Tipo:</label>
          <select onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione uma opção</option>
            <option value="A">Anunciante</option>
            <option value="M">Músico</option>
          </select>
          <label>Biografia:</label>
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setBiografia(e.target.value)}
          ></textarea>
          <label>Estilo:</label>
          <select onChange={(e) => setEstilo(e.target.value)}>
            <option value="">Selecione uma opção</option>
            <option value="Rock">Rock</option>
            <option value="Sertanejo">Sertanejo</option>
            <option value="Funk">Funk</option>
            <option value="Pagode">Pagode</option>
            <option value="Samba">Samba</option>
            <option value="MPB">MPB</option>
          </select>
          <label>Disponibilidade:</label>
          <input
            type="text"
            onChange={(e) => setDisponibilidade(e.target.value)}
          />
          <label>URL vídeo:</label>
          <input type="text" onChange={(e) => setLink(e.target.value)} />
          <input type="submit" value="Cadastrar" />
          <a href="/">Voltar</a>
        </form>
      </main>
    </div>
  );
};
