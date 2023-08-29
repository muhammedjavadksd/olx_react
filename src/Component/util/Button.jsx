import React from 'react'
import './style.css'
function Button(props) {
    let btnClass = props.class ? props.class : "default_btn";
    let type = props.type ? props.type : "button"
    return (
        <div>
            <button type={type} className={btnClass}>{props.title}</button>
        </div>
    )
}

export default Button
