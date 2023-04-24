import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cadastro } from "./pages/auth/Cadastro";
import { Login } from "./pages/auth/Login";
import { Feed } from "./pages/anuncios/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import Anuncio from "./pages/anuncios/Anuncio";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
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
          <Route path="/anuncios/anuncio/:id" element={<Anuncio />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
