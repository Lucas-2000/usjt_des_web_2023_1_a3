import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./cadastro.css";
import imgCadastro from "../../images/imgCadastro.jpg";
import { Input } from "../../components/Input/Input";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import "@fortawesome/fontawesome-free/css/all.css";

export const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("A");
  const [biografia, setBiografia] = useState("");
  const [estilo, setEstilo] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [link, setLink] = useState("");

  const navigate = useNavigate();

  function handleSubmitForm(e) {
    e.preventDefault();

    if (tipo === "M") {
      try {
        fetch("http://localhost:4000/usuarios", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            senha,
            tipo,
            biografia,
            estilo,
            disponibilidade,
            link,
          }),
        }).then((res) => {
          if (!res.ok) {
            return toast.error("Erro na inclusão", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          localStorage.setItem("showmsg", "1");
          return navigate("/");
        });
      } catch (err) {
        window.alert(`Erro: ${err.message}`);
      }
    } else {
      try {
        fetch("http://localhost:4000/usuarios", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            nome,
            email,
            senha,
            tipo,
            biografia,
            estilo: "",
            disponibilidade: "",
            link: "",
          }),
        }).then((res) => {
          if (!res.ok) {
            return toast.error("Erro na inclusão", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          localStorage.setItem("showmsg", "1");
          return navigate("/");
        });
      } catch (err) {
        window.alert(`Erro: ${err.message}`);
      }
    }
  }

  return (
    <div className="cadastro">
      <main className="main-cadastro">
        <div className="img-cadastro">
          <img src={imgCadastro} />
        </div>
        <div className="form-cadastro">
          <div className="header-cadastro">
            <h1>Faça seu cadastro</h1>
            <LinkButton class="link-button dark" linkTo="/" value="Entrar" />
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="group-cadastro">
              <Input
                className="input text-cadastro"
                placeholder="Nome Completo..."
                type="text"
                icon="fa-solid fa-user"
                label="Nome"
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                className="input text-cadastro"
                placeholder="email@exemplo.com"
                type="email"
                icon="fa-solid fa-envelope"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="input text-cadastro"
                placeholder="########"
                type="password"
                icon="fa-solid fa-lock"
                label="Senha"
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="radio-cadastro">
                <label>
                  <i className="fa-solid fa-music"></i>Tipo
                </label>
                <div className="radio-button">
                  <input
                    checked={tipo === "A"}
                    type="radio"
                    value="A"
                    name="tipo"
                    onChange={(e) => setTipo(e.target.value)}
                  />{" "}
                  Anunciante
                </div>
                <div className="radio-button">
                  <input
                    checked={tipo === "M"}
                    type="radio"
                    value="M"
                    name="tipo"
                    onChange={(e) => setTipo(e.target.value)}
                  />{" "}
                  Músico
                </div>
              </div>
              {tipo === "A" ? (
                <>
                  <div className="bio-cadastro">
                    <label>
                      <i className="fa-solid fa-book"></i>Biografia
                    </label>
                    <textarea
                      cols="30"
                      placeholder="Como são os seus eventos..."
                      rows="5"
                      onChange={(e) => setBiografia(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="bio-cadastro">
                    <label>
                      <i className="fa-solid fa-book"></i>Biografia
                    </label>
                    <textarea
                      cols="30"
                      rows="2"
                      placeholder="Qual a sua história na música..."
                      onChange={(e) => setBiografia(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="option-cadastro">
                    <label>
                      <i className="fa-solid fa-guitar"></i>Estilo
                    </label>
                    <select
                      onChange={(e) => setEstilo(e.target.value)}
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Rock">Rock</option>
                      <option value="Sertanejo">Sertanejo</option>
                      <option value="Funk">Funk</option>
                      <option value="Pagode">Pagode</option>
                      <option value="Samba">Samba</option>
                      <option value="MPB">MPB</option>
                    </select>
                  </div>
                  <Input
                    className="input text-cadastro"
                    placeholder="Quais os dias e horários..."
                    type="text"
                    icon="fa-solid fa-calendar"
                    label="Disponibilidade"
                    onChange={(e) => setDisponibilidade(e.target.value)}
                  />
                  <Input
                    className="input text-cadastro"
                    placeholder="Um pouco do seu trabalho..."
                    type="url"
                    icon="fa-solid fa-video"
                    label="URL Video"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </>
              )}
            </div>
            <SubmitButton class="submit-button dark" value="Cadastrar" />
          </form>
        </div>
      </main>
    </div>
  );
};
