import React from "react";

export const Login = () => {
  return (
    <div>
      <main>
        <form>
          <h1>Faça o login</h1>
          <label>Email:</label>
          <input type="email" />
          <label>Senha:</label>
          <input type="password" />
          <input type="submit" value="Login" />
          <a href="/cadastrar">Cadastro</a>
        </form>
      </main>
    </div>
  );
};
