import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Feed = () => {
  const { user } = useContext(AuthContext);
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/usuarios/${user.id}/anuncios`)
      .then((res) => res.json())
      .then((data) => setAnuncios(data));
  }, [user.id]);

  return (
    <main>
      <section>
        <label>
          Buscar <input type="text" id="busca" name="busca" />
        </label>
      </section>
      <h1>Confira os eventos disponíveis</h1>
      <section>
        {anuncios.length === 0 && <p>Sem anúncios no feed</p>}
        {anuncios.map((anuncio) => (
          <article key={anuncio.id}>
            <h2>{anuncio.titulo}</h2>
            <ul>
              <li>
                <h3>{anuncio.descricao}</h3>
              </li>
              <li>{anuncio.tipo}</li>
              <li>{anuncio.endereco}</li>
              <li>{anuncio.pagamento}</li>
            </ul>
            <button>Me Candidatar</button>
          </article>
        ))}
      </section>
    </main>
  );
};
