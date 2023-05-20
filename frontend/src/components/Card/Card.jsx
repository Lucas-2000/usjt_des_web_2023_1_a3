import React from "react";
import './Card.css'

export const Card = (props) => {
    return (
        <div key={props.key} className="anuncio-feed">
            <a href={props.linkTo}>
                <h2>{props.titulo}</h2>
                <ul>
                    <li>
                        <i className="fa-solid fa-guitar"></i>
                        <p>{props.tipo}</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>{props.endereco}</p>
                    </li>
                    <li>
                        <i className="fa-solid fa-dollar-sign"></i>
                        <p>R$ {props.pagamento}</p>
                    </li>
                </ul>
                <div className="bg-anuncio"></div>
            </a>
        </div>
    )
}