import React from 'react';
import { Link } from 'react-router-dom'

export default function GuestCartItems(props) {
  console.log("guest cart props", props)
  return (
    <div>
      {!props.cart.length ?
       (
        <h2>There are no items in your cart!</h2>
        // this doesn't show up when cart is empty
      ) : (
        props.cart.map((item, idx) => {
          return (
            <div>
            <div key={item.productId} style={{ border: '1px black solid' }}>
              <h3>{item.product.name}</h3>
              <h3>${item.product.price * item.qty}</h3>
              <h3>There are {item.qty} in your cart</h3>
              <button value={idx} type='button' onClick={props.handleDelete}>
                Remove from cart
              </button>
              <button value={idx} type='button' onClick={props.handleIncrement}>
                +
              </button>
              <button value={idx} type='button' onClick={props.handleDecrement}>
                -
              </button>
            </div>
            <Link to={"/cart/checkout"}>
            <button>Proceed to checkout</button>
            </Link>
            </div>
          )})
          )}
    </div>
  )
}