import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import imgAnuncio from "../../images/imgAnuncio.jpg";
import "./Anuncio.css";

const Anuncio = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [inscricoes, setInscricoes] = useState([]);
  const [anuncio, setAnuncio] = useState([]);
  const baseInscricoes = [];
  const baseAnuncios = [];

  useEffect(() => {
    fetch(`http://localhost:7000/inscricoes`)
      .then((res) => res.json())
      .then((data) => setInscricoes(data));
  }, []);

  for (let [id, colecao] of Object.entries(inscricoes)) {
    baseInscricoes.push(colecao);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/anuncios`)
      .then((res) => res.json())
      .then((data) => setAnuncio(data));
  });

  for (let [id, colecao] of Object.entries(anuncio)) {
    baseAnuncios.push(colecao);
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
          return toast.error("Usuário já inscrito", {
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
        return toast.success("Usuário inscrito com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    } catch (err) {
      window.alert(`Erro: ${err.message}`);
    }
  }

  return (
    <div className="anuncio">
      <main className="main-anuncio">
        <section className="form-anuncio">
          <article className="header-anuncio">
            {user.tipo === "A" ? <h1>Anúncio</h1> : <h1>Inscreva-se</h1>}
            <a href="/anuncios/feed">Voltar</a>
          </article>
          {baseAnuncios.map((anuncios, idAn) => (
            <section className="desc-anuncio" key={idAn}>
              {anuncios
                .filter((anuncio) => {
                  if (anuncio.idAnuncio === id) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((anuncio, subIdAn) => (
                  <article className="inner-desc-anuncio" key={subIdAn}>
                    <h1>{anuncio.titulo}</h1>
                    <h3>
                      <i className="fa-solid fa-file"></i> Descrição
                    </h3>
                    <p>{anuncio.descricao}</p>
                    <h3>
                      <i className="fa-solid fa-guitar"></i>Tipo
                    </h3>
                    <p>{anuncio.tipo}</p>
                    <h3>
                      <i className="fa-solid fa-location-dot"></i>Endereço
                    </h3>
                    <p>{anuncio.endereco}</p>
                    <h3>
                      <i className="fa-solid fa-dollar-sign"></i>Pagamento
                    </h3>
                    <p>{anuncio.pagamento}</p>
                  </article>
                ))}
            </section>
          ))}
          {user.tipo === "M" ? (
            <div className="submit-anuncio">
              <button onClick={criarInscricao}>Me Candidatar</button>
            </div>
          ) : null}
        </section>
        {user.tipo === "A" ? (
          <section className="tabela-anuncio">
            <h1>Inscrições</h1>
            {baseInscricoes.length === 0 ? (
              <h3>Sem inscrições</h3>
            ) : (
              <article className="head-tabela">
                <p>Veja abaixo todas as inscrições</p>
              </article>
            )}
            <table>
              <thead>

                <tr>
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
                        <td>{inscricao.nome}</td>
                        <td>{inscricao.email}</td>
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </section>
        ) : (
          <section className="img-anuncio">
            <img src={imgAnuncio} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Anuncio;
