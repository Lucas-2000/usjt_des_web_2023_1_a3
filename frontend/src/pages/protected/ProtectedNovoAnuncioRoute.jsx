import { useContext } from "react";
import { Navigate } from "react-router";

const ProtectedNovoAnuncioRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.includes(`"tipo":"M"`)) {
    return <Navigate to="/anuncios/feed" replace />;
  }

  return children;
};

export default ProtectedNovoAnuncioRoute;
