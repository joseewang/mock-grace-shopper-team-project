import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCartThunk } from '../store/cart';
import GuestCartItems from './GuestCartItems';
import UserCartItems from './UserCartItems';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      error: null,
      loading: true,
      userCart: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }
  componentDidMount() {
    try {
      const { token } = window.localStorage;
      if (token) {
        this.props.fetchCart(token);
      } else {
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cart === this.state.cart &&
      prevProps.cart === this.props.cart
    ) {
      return;
    } else {
      this.setState({ loading: false });
      const { token } = window.localStorage;
      if (token) {
        this.setState({ userCart: this.props.cart.products }); // RAD THIS WORKS
      }
    }
  }
  handleDelete(e) {
    const { token } = window.localStorage;
    if (token) {
      let idx = e.target.value;
      let cart = this.state.userCart;
      console.log('handleDelete user cart', this.state.userCart);
      let left = cart.slice(0, idx);
      let right = cart.slice(idx + 1);
      cart = [...left, ...right];
      this.props.updateCart(cart, token);
    } else {
      let idx = e.target.value;
      let cart = this.state.cart;
      console.log('before handleDelete visitor cart', this.state.cart)
      let left = cart.slice(0, idx);
      let right = cart.slice(idx + 1);
      cart = [...left, ...right];
      console.log('after handleDelete visitor cart', this.state.cart)
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  handleIncrement(e) {
    const { token } = window.localStorage;
    if (token) {
      const cart = this.state.userCart; //[{name, proce, quantity(inventory), saleItem: {quantity(in cart)}}]
      //e.target.value is the index in cart of the product to increment
      //if there's not enough inventory:
      if (
        cart[e.target.value].saleItem.quantity === cart[e.target.value].quantity
      ) {
        alert('There is not enough stock to add another item');
      } else {
        //update item.saleItem.quantity
        //dispatch update thunk
        //express route will need refactoring - currently it updates by setting assoc.
      }
    } else {
      const cart = JSON.parse(localStorage.cart);
      if (cart[e.target.value].product.quantity === cart[e.target.value].qty) {
        alert('There is not enough stock to add another item');
      } else {
        cart[e.target.value].qty++;
        localStorage.cart = JSON.stringify(cart);
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    }
  }
  handleDecrement(e) {
    const { token } = window.localStorage;
    if (token) {
      //if this is the only one of item in cart, run steps to delete
      if (cart[e.target.value].saleItem.quantity === 1) {
        let idx = e.target.value;
        let cart = this.state.userCart;
        let left = cart.slice(0, idx);
        let right = cart.slice(idx + 1);
        cart = [...left, ...right];
        this.props.updateCart(cart, token);
      } else {
        //update item.saleItem.quantity
        //dispatch update thunk
        //express route will need refactoring - currently it updates by setting assoc.
      }
    } else {
      let cart = JSON.parse(localStorage.cart);
      if (cart[e.target.value].qty === 1) {
        let idx = e.target.value;
        let left = cart.slice(0, idx);
        let right = cart.slice(idx + 1);
        cart = [...left, ...right];
      } else {
        cart[e.target.value].qty--;
      }
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  render() {
    // console.log('in main cart this.state.cart.length', this.state.cart.length)
    // console.log('in main cart this.state.cart', this.state.cart)
    // console.log('in main cart this.state.userCart.length', this.state.userCart.length)
    // console.log('in main cart this.state.userCart', this.state.userCart)
    return (
      <div>
        <h1>YOUR CART:</h1>
        <div style={{ border: '3px black solid' }}>
          {!this.state.loading &&
            (this.state.cart.length  ? (
              <GuestCartItems
                cart={this.state.cart}
                handleDelete={this.handleDelete}
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
              ></GuestCartItems>
            ) : (
              <UserCartItems
                cart={this.state.userCart}
                handleDelete={this.handleDelete}
                handleIncrement={this.handleIncrement}
                handleDecrement={this.handleDecrement}
              ></UserCartItems>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (token) => dispatch(fetchCart(token)),
    updateCart: (cart, token) => dispatch(updateCartThunk(cart, token)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

//can't increase more than the item's quantity

//purchase button
//clear local storage
//to the backend:

//sales/orders model
//decrement quantity by amount sold
//put route to create an instance
//action constant, creator, thunk, reducer
//maybe just an axios call in component because state doesn't need to reflect sales (unless for admin)
