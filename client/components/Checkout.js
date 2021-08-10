import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
    };
  }

  render(){
    console.log("checkout page this.props", this.props);
    const {username} = this.state;

    return (
      <div>
        <div>
          <Link to={"/login"}>
            <button>Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button>Create Account</button>
          </Link>
        </div>
        <form>
          <label>Enter email address:</label>
          <input username="email address" onChange={this.handleChange} value={username} />
          <button type="submit">Checkout as guest</button>
        </form>
        <Link to={"/cart/confirmation"}>
          <button>Place Order</button>
        </Link>
      </div>
    )
  }
}

export default connect()(Checkout);