import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cadastro } from "./pages/auth/Cadastro";
import { Login } from "./pages/auth/Login";
import { Feed } from "./pages/anuncios/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import Anuncio from "./pages/anuncios/Anuncio";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { useContext } from "react";
import { NovoAnuncio } from "./pages/anuncios/NovoAnuncio";
import ProtectedNovoAnuncioRoute from "./pages/protected/ProtectedNovoAnuncioRoute";

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
          <Route
            path="/novoanuncio"
            element={
              <ProtectedNovoAnuncioRoute>
                <NovoAnuncio />
              </ProtectedNovoAnuncioRoute>
            }
          />
          <Route
            path="/anuncios/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/anuncios/anuncio/:id"
            element={
              <ProtectedRoute>
                <Anuncio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
