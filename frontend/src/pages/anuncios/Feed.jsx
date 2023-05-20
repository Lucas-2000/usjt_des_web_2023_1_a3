import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import "./Feed.css";
import { Input } from "../../components/Input/Input";
import { Card } from "../../components/Card/Card"
import "@fortawesome/fontawesome-free/css/all.css";

export const Feed = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState("T");
  const [anuncios, setAnuncios] = useState([]);
  const [todosAnuncios, setTodosAnuncios] = useState([]);
  const [search, setSearch] = useState("");
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
      fetch(`http://localhost:5000/usuarios/${user.email}/anuncios`)
        .then((res) => res.json())
        .then((data) => setAnuncios(data));
    }, [user.email]);
  }

  if (localStorage.getItem("showmsg") == "1") {
    toast.success("Anuncio cadastrado com sucesso", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    localStorage.removeItem("showmsg");
  }

  function logout() {
    localStorage.removeItem("user");
    return navigate("/");
  }

  return (
    <div className="feed">
      <header className="header-feed">
        {user.tipo === "A" ? (
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
        ) : null}
        <div className="search-feed">
          <Input
            className="input"
            type="text"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Buscar..."
            inputClass="search"
          />
        </div>
        <div className="logout-feed">
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Sair</p>
          </button>
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
            <article className="anuncios-all-feed">
              {baseAnuncios.map((anuncios) => (
                <>
                  {anuncios
                    .filter((anuncio) => {
                      if (search === "") {
                        return anuncio;
                      } else if (
                        anuncio.titulo
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return anuncio;
                      }
                    })
                    .map((anuncio, subId) => (
                      <Card
                        key={subId} linkTo={`/anuncios/anuncio/${anuncio.idAnuncio}`}
                        titulo={anuncio.titulo}
                        tipo={anuncio.tipo}
                        endereco={anuncio.endereco}
                        pagamento={anuncio.pagamento} />
                    ))}
                </>
              ))}
            </article>
          </section>
        ) : (
          <section className="anuncios-feed">
            {anuncios.length === 0 && <p>Sem anúncios no feed</p>}
            {anuncios
              .filter((anuncio) => {
                if (search === "") {
                  return anuncio;
                } else if (
                  anuncio.titulo.toLowerCase().includes(search.toLowerCase())
                ) {
                  return anuncio;
                }
              })
              .map((anuncio, id) => (
                <Card
                  key={id} linkTo={`/anuncios/anuncio/${anuncio.idAnuncio}`}
                  titulo={anuncio.titulo}
                  tipo={anuncio.tipo}
                  endereco={anuncio.endereco}
                  pagamento={anuncio.pagamento} />
              ))}
          </section>
        )}
        {user.tipo === "A" ? (
          <a href="/novoanuncio" className="mais-anuncio">
            +
          </a>
        ) : null}
      </main>
    </div>
  );
};
