import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      error: null,
      loading: true,
    };
    this.handleDelete = this.handleDelete.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }
  componentDidMount() {
    try {
      this.setState({ cart: JSON.parse(localStorage.cart) });
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart === this.state.cart) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  handleDelete(e) {
    let idx = e.target.value
    let cart = this.state.cart
    let left = cart.slice(0, idx)
    let right = cart.slice(idx+1)
    cart = [...left, ...right]
    localStorage.cart = JSON.stringify(cart);
    this.setState({cart: JSON.parse(localStorage.cart)})
  }
  handleIncrement(e) {
    const cart = JSON.parse(localStorage.cart)
    if (cart[e.target.value].product.quantity === cart[e.target.value].qty) {
      alert('There is not enough stock to add another item')
    } else {
      cart[e.target.value].qty++
      localStorage.cart = JSON.stringify(cart);
      this.setState({cart: JSON.parse(localStorage.cart)})
    }
  }
  handleDecrement(e) {
    let cart = JSON.parse(localStorage.cart)
    if (cart[e.target.value].qty === 1) {
      let idx = e.target.value
      let left = cart.slice(0, idx)
      let right = cart.slice(idx+1)
      cart = [...left, ...right]
    } else {
      cart[e.target.value].qty--
    }
    localStorage.cart = JSON.stringify(cart);
    this.setState({cart: JSON.parse(localStorage.cart)})
  }
  render() {
    return (
      <div>
        <h1>YOUR CART:</h1>
        <div style={{ border: '3px black solid' }}>
          {!this.state.cart.length ? (
            <h2>There are no items in your cart!</h2>
          ) : (
            this.state.cart.map((item, idx) => {
              return (
                <div key={item.productId} style={{ border: '1px black solid' }}>
                  <h3>{item.product.name}</h3>
                  <h3>${item.product.price * item.qty}</h3>
                  <h3>There are {item.qty} in your cart</h3>
                  <button
                    value={idx}
                    type='button'
                    onClick={this.handleDelete}
                  >
                    Remove from cart
                  </button>
                  <button
                    value={idx}
                    type='button'
                    onClick={this.handleIncrement}
                  >
                    +
                  </button>
                  <button
                    value={idx}
                    type='button'
                    onClick={this.handleDecrement}
                  >
                    -
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default connect()(Cart);