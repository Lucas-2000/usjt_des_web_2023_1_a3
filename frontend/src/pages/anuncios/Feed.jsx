import React, { useState } from "react";
import { useEffect } from "react";

export const Feed = () => {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/anuncios")
      .then((res) => res.json())
      .then((data) => setAnuncios(data));
  }, []);

  return (
    <main>
      <section>
        <label>
          Buscar <input type="text" id="busca" name="busca" />
        </label>
      </section>
      <h1>Confira os eventos disponíveis</h1>
      <section>
        {anuncios.map((anuncio) => (
          <article>
            <h2>{anuncio.titulo}</h2>
            <ul>
              <li>
                <h3>{anuncio.descricao}</h3>Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Autem illo repudiandae doloribus
                sit numquam ipsam nisi atque, enim ea suscipit rerum quod
                excepturi eligendi dignissimos, a minima dolores nesciunt totam?
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
