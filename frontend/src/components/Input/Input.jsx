import React from 'react'
import './Input.css'
import '@fortawesome/fontawesome-free/css/all.css'

export const Input = (props) => {
    return (
        <div className={props.class}>
            <label><i class={props.icon}></i>{props.label}</label>
            <input
                type={props.type}
                onChange={props.onChange}
                required
            />
        </div>
    )
}