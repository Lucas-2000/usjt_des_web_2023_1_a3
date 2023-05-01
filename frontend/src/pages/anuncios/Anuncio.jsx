import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Anuncio = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [inscricoes, setInscricoes] = useState([]);
  const baseInscricoes = [];

  useEffect(() => {
    fetch(`http://localhost:7000/inscricoes`)
      .then((res) => res.json())
      .then((data) => setInscricoes(data));
  }, []);

  for (let [id, colecao] of Object.entries(inscricoes)) {
    baseInscricoes.push(colecao);
  }

  function criarInscricao() {
    try {
      fetch(`http://localhost:7000/usuarios/${user.id}/inscricoes`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          idAnuncio: id,
          nome: user.nome,
          email: user.email,
        }),
      }).then((res) => {
        if (!res.ok) {
          return toast.error("Erro na inscrição", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        location.reload();
      });
    } catch (err) {
      window.alert(`Erro: ${err.message}`);
    }
  }

  return (
    <div className="anuncio">
      <main className="main-anuncio">
        <article className="header-anuncio">
          <h1>Anuncio: {id}</h1>
          <h2>Caso deseje se candidatar para o evento, clique no botão abaixo</h2>
          <button onClick={criarInscricao}>Me Candidatar</button>
          {baseInscricoes.length === 0 ? (
            <p>Sem inscrições</p>
          ) : (
            <p>Veja abaixo todas as inscrições</p>
          )}
        </article>
        <table>
          <thead>
            <tr>
              <th>Usuário Id</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          {baseInscricoes.map((inscricoes, idInsc) => (
            <tbody key={idInsc}>
              {inscricoes
                .filter((inscricao) => {
                  if (inscricao.idAnuncio === id) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((inscricao, subIdInsc) => (
                  <tr key={subIdInsc}>
                    <td>{inscricao.idUsuario}</td>
                    <td>{inscricao.nome}</td>
                    <td>{inscricao.email}</td>
                  </tr>
                ))}
            </tbody>
          ))}
        </table>
      </main>
    </div>
  );
};

export default Anuncio;
