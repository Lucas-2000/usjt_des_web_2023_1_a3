import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imgNovoAnuncio from "../../images/imgNovoAnuncio.jpeg";
import { Input } from "../../components/Input/Input";
import "./NovoAnuncio.css";

export const NovoAnuncio = () => {
  const { user } = useContext(AuthContext);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

  const navigate = useNavigate();

  function handleSubmitForm(e) {
    e.preventDefault();

    try {
      fetch(`http://localhost:5000/usuarios/${user.email}/anuncios`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao,
          tipo,
          endereco,
          pagamento,
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
        return navigate("/anuncios/feed");
      });
    } catch (err) {
      window.alert(`Erro: ${err.message}`);
    }
  }

  return (
    <div className="novo-anuncio">
      <main className="main-novo-anuncio">
        <div className="img-novo-anuncio">
          <img src={imgNovoAnuncio} />
        </div>
        <div className="form-novo-anuncio">
          <div className="header-novo-anuncio">
            <h1>Crie seu novo evento</h1>
            <a href="/anuncios/feed">Voltar</a>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="group-novo-anuncio">
              <Input
                className="input text-login"
                type="text"
                icon="fa-solid fa-user"
                label="Titulo"
                onChange={(e) => setTitulo(e.target.value)}
              />
              <div className="desc-novo-anuncio">
                <label>
                  <i className="fa-solid fa-file"></i>Descrição
                </label>
                <textarea
                  cols="30"
                  rows="2"
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                ></textarea>
              </div>
              <Input
                className="input text-login"
                type="text"
                icon="fa-solid fa-location-dot"
                label="Endereço"
                onChange={(e) => setEndereco(e.target.value)}
              />
              <div className="option-novo-anuncio">
                <label>
                  <i className="fa-solid fa-guitar"></i>Estilo
                </label>
                <select onChange={(e) => setTipo(e.target.value)} required>
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
                type="text"
                icon="fa-solid fa-dollar-sign"
                label="Pagamento"
                onChange={(e) => setPagamento(e.target.value)}
              />
            </div>
            <div className="submit-novo-anuncio">
              <input type="submit" value="Criar" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
