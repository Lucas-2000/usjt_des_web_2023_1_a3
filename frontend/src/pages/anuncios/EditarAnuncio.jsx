import React from "react";
import { useParams } from "react-router";

export const EditarAnuncio = () => {
  const params = useParams();

  return <div>Anuncio: {params.id}</div>;
};
