import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, updateCartThunk } from '../store/cart';
import GuestCartItems from './GuestCartItems';
import UserCartItems from './UserCartItems';
import { Link } from 'react-router-dom';

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
      // Being logged in is defined has having a token in local storage
      const { token: isLoggedIn } = window.localStorage;

      // Case: The user is logged in
      if (isLoggedIn) {
        this.props.fetchCart();
      }

      // Case: The user is not logged in (the user is a guest)
      else {
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.cart === this.state.cart && prevProps.cart === this.props.cart
    ) {
      return;
    }

    this.setState({ loading: false });

    // Being logged in is defined has having a token in local storage
    const { token: isLoggedIn } = window.localStorage;

    if (isLoggedIn) {
      this.setState({ userCart: this.props.cart.products });
    }
  }

  handleDelete(event) {
    // Being logged in is defined has having a state.auth that has a truthy id
    const isLoggedIn = this.props.auth.id;

    // Index in cart of the product to delete
    const targetIdx = event.target.value;

    // Case: The user is logged in
    if (isLoggedIn) {
      let cart = this.state.userCart;
      cart.splice(targetIdx, 1)
      this.props.updateCart(cart, 'delete');
    }

    // Case: The user is not logged in (the user is a guest)
    else {
      let cart = this.state.cart;
      cart.splice(targetIdx, 1)
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }

  handleIncrement(event) {
    // Being logged in is defined has having a state.auth that has a truthy id
    const isLoggedIn = this.props.auth.id;

    // Index in cart of the product to increment
    const targetIdx = event.target.value;

    // Case: The user is logged in
    if (isLoggedIn) {
      // Get the cart from the state
      // Cart structure: [{name, price, quantity(inventory), saleItem: {quantity(in cart)}}]
      let cart = this.state.userCart;

      // Case: Not enough inventory to add another product; alert the user
      if (cart[targetIdx].saleItem.quantity === cart[targetIdx].quantity) {
        alert('There is not enough stock to add another item');
      }

      // Case: Enough inventory; increment the quantity
      else {
        cart = cart[targetIdx].id
        this.props.updateCart(cart, 'increment')
      }
    }

    // Case: The user is not logged in (the user is a guest)
    else {
      // Get the cart from local storage
      const cart = JSON.parse(localStorage.cart);

      // Case: Not enough inventory to add another product; alert the user
      if (cart[targetIdx].product.quantity === cart[targetIdx].qty) {
        alert('There is not enough stock to add another item');
      }

      // Case: Enough inventory; increment the quantity
      else {
        cart[targetIdx].qty++;
        localStorage.cart = JSON.stringify(cart);
        this.setState({ cart: JSON.parse(localStorage.cart) });
      }
    }
  }

  handleDecrement(event) {
    // Being logged in is defined has having a state.auth that has a truthy id
    const isLoggedIn = this.props.auth.id;

    // Index in cart of the product to decrement
    const targetIdx = event.target.value;

    // Case: The user is logged in
    if (isLoggedIn) {
      // Get the cart from the state
      let cart = this.state.userCart

      // Case: target item's quantity is 1; remove it from the upon decrement
      if (cart[targetIdx].saleItem.quantity === 1) {
        let idx = targetIdx;
        let left = cart.slice(0, idx);
        idx++;
        let right = cart.slice(idx);
        cart = [...left, ...right];
        this.props.updateCart(cart, "delete");
      }

      // Case: target items's quantity > 1; decrement normally
      else {
        cart = cart[targetIdx].id
        this.props.updateCart(cart, 'decrement')
      }
    }

    // Case: The user is not logged in (the user is a guest)
    else {
      // Get the cart from local storage
      let cart = JSON.parse(localStorage.cart);

      // Case: target item's quantity is 1; remove it from the upon decrement
      if (cart[targetIdx].qty === 1) {
        let idx = targetIdx;
        let left = cart.slice(0, idx);
        idx++;
        let right = cart.slice(idx);
        cart = [...left, ...right];
      }

      // Case: target items's quantity > 1; decrement normally
      else {
        cart[targetIdx].qty--;
      }
      localStorage.cart = JSON.stringify(cart);
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }

  render() {
    console.log('in main cart this.state.cart.length', this.state.cart.length)
    console.log('in main cart this.state.cart', this.state.cart)
    console.log('in main cart this.state.userCart.length', this.state.userCart.length)
    console.log('in main cart this.state.userCart', this.state.userCart)
    
    return (
      <div>
        <h1>YOUR CART:</h1>
        <div style={{ border: '3px black solid' }}>
          {!this.state.loading &&
            (this.state.cart.length ? (
              <div>
                <GuestCartItems
                  cart={this.state.cart}
                  handleDelete={this.handleDelete}
                  handleIncrement={this.handleIncrement}
                  handleDecrement={this.handleDecrement}
                ></GuestCartItems>
                <Link to={"/cart/checkout"}>
                  <button>Proceed to checkout</button>
                </Link>
              </div>
            ) : (
              <div>
                <UserCartItems
                  cart={this.state.userCart}
                  handleDelete={this.handleDelete}
                  handleIncrement={this.handleIncrement}
                  handleDecrement={this.handleDecrement}
                ></UserCartItems>
                <Link to={"/cart/checkout"}>
                  <button>Proceed to checkout</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    updateCart: (cart, method) => dispatch(updateCartThunk(cart, method)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
