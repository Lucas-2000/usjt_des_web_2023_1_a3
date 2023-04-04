import React from "react";
import { toast } from "react-toastify";

export const Login = () => {
  if (localStorage.getItem("showmsg") == "1") {
    toast.success("Usuário cadastrado com sucesso", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    localStorage.removeItem("showmsg");
  }

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
