import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cadastro } from "./pages/auth/Cadastro";
import { Login } from "./pages/auth/Login";
import { Feed } from "./pages/anuncios/Feed";
import { EditarAnuncio } from "./pages/anuncios/EditarAnuncio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/anuncios/feed" element={<Feed />} />
        <Route path="/anuncios/editar/:id" element={<EditarAnuncio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
