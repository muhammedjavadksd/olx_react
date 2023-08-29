import React from 'react'
import { useNavigate } from 'react-router-dom';
import './assets/css/style.css'

function ProductItem(props) {

  let navigate = useNavigate()

  function redirectView() {
    navigate("/viewProduct/"+props.id)
  }
  return (
    <div className='productItem' onClick={redirectView}>
      <div className="productImage">
        <img src={props.image} alt="" />
      </div>
      <div className="productDescription">
        <h4>₹ {props.price}</h4>
        <span>{props.name}</span>
        <h6>{props.description}</h6>
      </div>
    </div>
  )
}

export default ProductItem
