import React from "react";
import { addToCart } from '../store/cart'
import { connect } from 'react-redux'

class AddProdToCart extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.auth.id) {
      console.log("this.props.auth.id in handleClick", this.props.auth.id); //my code
      this.props.addToCart(this.props.product.id, this.props.auth.id)

      console.log("Added to user cart!");
    } else {
      const product = this.props.product;
      let cart = JSON.parse(localStorage.cart || null) || [];
      let found = false;
      for (const item of cart) {
        if (item.productId === product.id) {
          item.qty++
          found = true;
          break;
        }
      }
      if (!found) {
        const newCartItem = { productId: product.id, qty: 1, product }
        cart.push(newCartItem);
      }
      localStorage.cart = JSON.stringify(cart);
    }
  }

  render() {

    return (
      <button type="button" onClick={this.handleClick}>
        Add To Cart
      </button>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToCart: (productId, userId) => dispatch(addToCart(productId, userId))

  }
}
export default connect(null, mapDispatch)(AddProdToCart);
