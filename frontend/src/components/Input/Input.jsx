import React from "react";
import "./Input.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const Input = (props) => {
  return (
    <div className={props.className}>
      <label>
        <i className={props.icon}></i>
        {props.label}
      </label>
      <input type={props.type} onChange={props.onChange} required />
    </div>
  );
};
