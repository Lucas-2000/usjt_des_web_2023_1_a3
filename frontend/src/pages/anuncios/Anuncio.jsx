import React from "react";
import { useParams } from "react-router";

const Anuncio = () => {
  const { id } = useParams();

  return <div>Anuncio: {id}</div>;
};

export default Anuncio;
