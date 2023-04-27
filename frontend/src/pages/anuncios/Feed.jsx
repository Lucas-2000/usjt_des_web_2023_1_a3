import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export const Feed = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState("T");
  const [anuncios, setAnuncios] = useState([]);
  const [todosAnuncios, setTodosAnuncios] = useState([]);
  const navigate = useNavigate();
  const baseAnuncios = [];

  if (todos === "T") {
    useEffect(() => {
      fetch(`http://localhost:5000/anuncios`)
        .then((res) => res.json())
        .then((data) => setTodosAnuncios(data));
    }, [todos]);

    for (let [id, colecao] of Object.entries(todosAnuncios)) {
      baseAnuncios.push(colecao);
    }
  } else {
    useEffect(() => {
      fetch(`http://localhost:5000/usuarios/${user.id}/anuncios`)
        .then((res) => res.json())
        .then((data) => setAnuncios(data));
    }, [user.id]);
  }

  function logout() {
    localStorage.removeItem("user");
    return navigate("/");
  }

  return (
    <main>
      <section>
        <button onClick={logout}>Sair</button>
        <label>
          Buscar <input type="text" id="busca" name="busca" />
        </label>
        <input
          checked={todos === "T"}
          type="radio"
          value="T"
          name="todos"
          onChange={(e) => setTodos(e.target.value)}
        />{" "}
        Ver todos
        <input
          checked={todos === "M"}
          type="radio"
          value="M"
          name="todos"
          onChange={(e) => setTodos(e.target.value)}
        />{" "}
        Ver os meus
      </section>
      <h1>Confira os eventos disponíveis</h1>
      {todos === "T" ? (
        <section>
          {baseAnuncios.length === 0 && <p>Sem anúncios no feed</p>}
          {baseAnuncios.map((anuncios, id) => (
            <article key={id}>
              {anuncios.map((anuncio, subId) => (
                <div key={subId}>
                  <h2>{anuncio.titulo}</h2>
                  <ul>
                    <li>
                      <h3>{anuncio.descricao}</h3>
                    </li>
                    <li>{anuncio.tipo}</li>
                    <li>{anuncio.endereco}</li>
                    <li>{anuncio.pagamento}</li>
                  </ul>
                  <a href={`/anuncios/anuncio/${anuncio.idAnuncio}`}>
                    Ver mais
                  </a>
                </div>
              ))}
            </article>
          ))}
        </section>
      ) : (
        <section>
          {anuncios.length === 0 && <p>Sem anúncios no feed</p>}
          {anuncios.map((anuncio, id) => (
            <article key={id}>
              <h2>{anuncio.titulo}</h2>
              <ul>
                <li>
                  <h3>{anuncio.descricao}</h3>
                </li>
                <li>{anuncio.tipo}</li>
                <li>{anuncio.endereco}</li>
                <li>{anuncio.pagamento}</li>
              </ul>
              <a href={`/anuncios/anuncio/${anuncio.id}`}>Ver mais</a>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};
