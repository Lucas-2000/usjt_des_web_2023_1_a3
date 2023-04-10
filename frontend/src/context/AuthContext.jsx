import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
      setUser({
        nome: "",
        email: "",
        senha: "",
        tipo: "",
        biografia: "",
        estilo: "",
        disponibilidade: "",
        link: "",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
