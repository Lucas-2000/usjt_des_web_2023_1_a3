import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import './Feed.css'
import { Input } from "../../components/Input/Input";
import "@fortawesome/fontawesome-free/css/all.css";
import imgAnuncio from "../../images/iconAnuncio.png"

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
    <div className="feed">
      <header className="header-feed">
        <div className="radio-feed">
          <div className="radio-option">
            <input
              checked={todos === "T"}
              type="radio"
              value="T"
              name="todos"
              onChange={(e) => setTodos(e.target.value)}
            />{" "}
            <div className="radio-btn">
              <i className="fa-solid fa-border-all"></i>
              <p>Ver todos</p>
            </div>
          </div>
          <div className="radio-option">
            <input
              checked={todos === "M"}
              type="radio"
              value="M"
              name="todos"
              onChange={(e) => setTodos(e.target.value)}
            />{" "}
            <div className="radio-btn">
              <i className="fa-solid fa-user"></i>
              <p>Ver os meus</p>
            </div>
          </div>
        </div>
        <div className="search-feed">
          <Input
            className="input"
            type="text"
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar..."
            inputClass="search"
          />
        </div>
        <div className="logout-feed">
          <button onClick={logout}><i className="fa-solid fa-right-from-bracket"></i><p>Sair</p></button>
        </div>
      </header>
      <main className="main-feed">
        <section className="titulo-feed">
          <div className="inner-titulo">
            <h1>Eventos disponíveis</h1>
          </div>
        </section>
        {todos === "T" ? (
          <section className="anuncios-feed">
            {baseAnuncios.length === 0 && <p>Sem anúncios no feed</p>}
            {baseAnuncios.map((anuncios, id) => (
              <article key={id} className="anuncios-all-feed">
                {anuncios.map((anuncio, subId) => (
                  <div key={subId} className="anuncio-feed">
                    <a href={`/anuncios/anuncio/${anuncio.idAnuncio}`}>
                      <h2>{anuncio.titulo}</h2>
                      <ul>
                        <li><i className="fa-solid fa-file"></i><p>{anuncio.descricao}</p></li>
                        <li><i className="fa-solid fa-guitar"></i><p>{anuncio.tipo}</p></li>
                        <li><i className="fa-solid fa-location-dot"></i><p>{anuncio.endereco}</p></li>
                        <li><i className="fa-solid fa-dollar-sign"></i><p>{anuncio.pagamento}</p></li>
                      </ul>
                      <div className="bg-anuncio"></div>
                    </a>
                  </div>
                ))}
              </article>
            ))}
          </section>
        ) : (
          <section className="anuncios-feed">
            {anuncios.length === 0 && <p>Sem anúncios no feed</p>}
            {anuncios.map((anuncio, id) => (
              <article key={id} className="anuncio-feed">
                <a href={`/anuncios/anuncio/${anuncio.idAnuncio}`}>
                  <h2>{anuncio.titulo}</h2>
                  <ul>
                    <li><i className="fa-solid fa-file"></i><p>{anuncio.descricao}</p></li>
                    <li><i className="fa-solid fa-guitar"></i><p>{anuncio.tipo}</p></li>
                    <li><i className="fa-solid fa-location-dot"></i><p>{anuncio.endereco}</p></li>
                    <li><i className="fa-solid fa-dollar-sign"></i><p>{anuncio.pagamento}</p></li>
                  </ul>
                  <div className="bg-anuncio"></div>
                </a>
              </article>
            ))}
          </section>
        )}
        <a href="#" className="mais-anuncio">+</a>
      </main>
    </div >
  );
};
