import React from 'react'
import './style.css'

function WhiteBox(props) {
    return (
        <div className={'whiteBox ' + props.class}>
            {props.children}
        </div>
    )
}

export default WhiteBox
