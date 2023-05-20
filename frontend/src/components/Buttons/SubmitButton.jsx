import React from "react";
import "./SubmitButton.css";

export const SubmitButton = (props) => {
    return (
        <input className={props.class} type="submit" value={props.value} />
    )
}