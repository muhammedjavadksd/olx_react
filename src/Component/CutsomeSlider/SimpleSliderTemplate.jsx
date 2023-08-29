import React from 'react'
import './style.css'
function SimpleSliderTemplate(props) {
    return (
        <div className='simpleSliderTemplate'>
            <img src={props.src} height={props.imageHeight}  alt="" />
        </div>
    )
}

export default SimpleSliderTemplate
