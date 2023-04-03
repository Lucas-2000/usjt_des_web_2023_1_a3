import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cadastro } from "./pages/auth/Cadastro";
import { Login } from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
