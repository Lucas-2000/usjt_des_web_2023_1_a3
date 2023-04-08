import React from "react";

export const Feed = () => {
  return (
    <main>
      <section>
        <label>Buscar <input type="text" id="busca" name="busca" /></label>
      </section>
      <h1>Confira os eventos disponíveis</h1>
      <section>
        <article>
          <h2>Titulo Vaga</h2>
          <ul>
            <li><h3>Descrição</h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem illo repudiandae doloribus sit numquam ipsam nisi atque, enim ea suscipit rerum quod excepturi eligendi dignissimos, a minima dolores nesciunt totam?</li>
            <li>Tipo</li>
            <li>Endereço</li>
            <li>Pagamento</li>
          </ul>
          <button>Me Candidatar</button>
          <button>Editar</button>
        </article>
      </section>
    </main>
  )
};
