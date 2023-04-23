import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import imgLogin from "../../images/imgLogin.jpg";
import "./Login.css";
import { Input } from "../../components/Input/Input";

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
    <div className="login">
      <main className="main-login">
        <div className="img-login">
          <img src={imgLogin} alt="Imagem de um violão" />
        </div>
        <div className="form-login">
          <div className="header-login">
            <h1>Login</h1>
            <a href="/cadastrar">Cadastre-se</a>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="group-login">
              <Input
                className="input text-login"
                type="email"
                icon="fa-solid fa-envelope"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="input text-login"
                type="password"
                icon="fa-solid fa-lock"
                label="Senha"
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="submit-login">
                <input type="submit" value="Login" />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
