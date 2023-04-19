import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './cadastro.css'
import imgCadastro from '../../images/imgCadastro.jpg'

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
          console.log(res);
          if (!res.ok) {
            return toast.error("Erro na inclusão", {
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
              theme: "colored",
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
      <main className="cadastro-form">
        <div className="img-form">
          <img src={imgCadastro} />
        </div>
        <div className="form">
          <div className="header-form">
            <h1>Faça seu cadastro</h1>
            <a href="#">Entrar</a>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="group-form">
              <div className="input-form">
                <label>Nome:</label>
                <input
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="input-form">
                <label>Email:</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-form">
                <label>Senha:</label>
                <input
                  type="password"
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div className='radio-form'>
                <label>Tipo:</label>
                <div className="radio-button">
                  <input
                    checked={tipo === "A"}
                    type="radio"
                    value="A"
                    name="tipo"
                    onChange={(e) => setTipo(e.target.value)}
                  />{" "}
                  Anunciante</div>
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
                  <div className="bio-form">
                    <label>Biografia:</label>
                    <textarea
                      cols="30"
                      rows="5"
                      onChange={(e) => setBiografia(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="bio-form">
                    <label>Biografia:</label>
                    <textarea
                      cols="30"
                      rows="2"
                      onChange={(e) => setBiografia(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="option-form">
                    <label>Estilo:</label>
                    <select onChange={(e) => setEstilo(e.target.value)} required>
                      <option value="">Selecione uma opção</option>
                      <option value="Rock">Rock</option>
                      <option value="Sertanejo">Sertanejo</option>
                      <option value="Funk">Funk</option>
                      <option value="Pagode">Pagode</option>
                      <option value="Samba">Samba</option>
                      <option value="MPB">MPB</option>
                    </select>
                  </div>
                  <div className="input-form">
                    <label>Disponibilidade:</label>
                    <input
                      type="text"
                      onChange={(e) => setDisponibilidade(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-form">
                    <label>URL vídeo:</label>
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              <div className="submit-form">
                <input type="submit" value="Cadastrar" />
              </div>
            </div>
          </form>
        </div>
      </main >
    </div >
  );
};
