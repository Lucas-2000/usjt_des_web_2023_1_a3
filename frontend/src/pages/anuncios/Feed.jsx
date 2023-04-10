import React, { useState } from "react";
import { useEffect } from "react";

export const Feed = () => {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/anuncios")
      .then((res) => res.json())
      .then((data) => setAnuncios(data));
  }, []);

  console.log(anuncios);

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
              <a href={`/anuncios/editar/${anuncio.id}`}>Editar</a>
            </ul>
            <button>Me Candidatar</button>
          </article>
        ))}
      </section>
    </main>
  );
};
