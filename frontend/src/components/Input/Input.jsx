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
      <input className={props.inputClass} type={props.type} onChange={props.onChange} placeholder={props.placeholder} required />
    </div>
  );
};
