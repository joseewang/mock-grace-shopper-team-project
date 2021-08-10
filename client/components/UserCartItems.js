import React from 'react';

export default function UserCartItems(props) {
  return (
    <div>
      {!props.cart.length ?
       (
        <h2>There are no items in your cart!</h2>
        // this doesn't show up when cart is empty
      ) : (
        props.cart.map((item, idx) => {
          return (
            <div key={item.id} style={{ border: '1px black solid' }}>
              <h3>{item.name}</h3>
              <h3>${item.price * item.saleItem.quantity}</h3>
              {item.saleItem.quantity === 1 
              ? <h3>There is {item.saleItem.quantity} in your cart</h3>
              : <h3>There are {item.saleItem.quantity} in your cart</h3>
             }
             
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
          );
        })
      )}
    </div>
  );
}
