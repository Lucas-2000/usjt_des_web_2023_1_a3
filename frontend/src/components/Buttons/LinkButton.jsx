import React from "react";
import "./LinkButton.css";

export const LinkButton = (props) => {
    return (
        <a className={props.class} href={props.linkTo}>{props.value}</a>
    )
}