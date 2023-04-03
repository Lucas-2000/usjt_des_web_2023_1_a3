import React, { useState } from "react";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("A");
  const [biografia, setBiografia] = useState("");
  const [estilo, setEstilo] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [link, setLink] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();

    if (tipo === "M") {
      try {
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
          if (!res.ok) {
            return window.alert("Erro na inclusão, usuário já cadastrado");
          }
          window.alert("Usuário cadastrado com sucesso");
          return res;
        });
      } catch (err) {
        window.alert(`Erro: ${err.message}`);
      }
    } else {
      try {
        fetch("http://localhost:4000/usuarios", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            senha,
            tipo,
            biografia,
            estilo: "",
            disponibilidade: "",
            link: "",
          }),
        }).then((res) => {
          console.log(res);
          if (!res.ok) {
            return window.alert("Erro na inclusão, usuário já cadastrado");
          }
          window.alert("Usuário cadastrado com sucesso");
          return res;
        });
      } catch (err) {
        window.alert(`Erro: ${err.message}`);
      }
    }
  }

  return (
    <div>
      <main>
        <form onSubmit={handleSubmitForm}>
          <h1>Faça seu cadastro</h1>
          <label>Nome:</label>
          <input
            type="text"
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <label>Tipo:</label>
          <input
            checked={tipo === "A"}
            type="radio"
            value="A"
            name="tipo"
            onChange={(e) => setTipo(e.target.value)}
          />{" "}
          Anunciante
          <input
            checked={tipo === "M"}
            type="radio"
            value="M"
            name="tipo"
            onChange={(e) => setTipo(e.target.value)}
          />{" "}
          Músico
          {tipo === "A" ? (
            <>
              <label>Biografia:</label>
              <textarea
                cols="30"
                rows="10"
                onChange={(e) => setBiografia(e.target.value)}
                required
              ></textarea>
            </>
          ) : (
            <>
              <label>Biografia:</label>
              <textarea
                cols="30"
                rows="10"
                onChange={(e) => setBiografia(e.target.value)}
                required
              ></textarea>
              <label>Estilo:</label>
              <select onChange={(e) => setEstilo(e.target.value)} required>
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
                required
              />
              <label>URL vídeo:</label>
              <input
                type="text"
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </>
          )}
          <input type="submit" value="Cadastrar" />
          <a href="/">Voltar</a>
        </form>
      </main>
    </div>
  );
};
