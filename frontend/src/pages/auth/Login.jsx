import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import imgLogin from "../../images/imgLogin.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  function handleSubmitForm(e) {
    e.preventDefault();

    try {
      fetch(`http://localhost:4000/usuarios/login/${email}/${senha}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            return toast.error("Erro no login", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            navigate("/anuncios/feed");
          }
        });
    } catch (err) {
      toast.success(`Erro: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const userLogged = localStorage.getItem("user");

  if (userLogged !== null) return navigate("/anuncios/feed");

  return (
    <div>
      <main>
        <div>
          <img src={imgLogin} alt="Imagem de um violão" />
        </div>
        <form onSubmit={handleSubmitForm}>
          <h1>Faça o login</h1>
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input type="submit" value="Login" />
          <a href="/cadastrar">Cadastro</a>
        </form>
      </main>
    </div>
  );
};
