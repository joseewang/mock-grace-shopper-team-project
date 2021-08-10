import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Confirmation extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render () {
    console.log('confirmation page this.props', this.props);
    
    return(
      <div>
        <h1>Thank you for your order</h1>
        <h3>Confirmation will be sent to...</h3>
        <h3>Order number...</h3>
        <h3>Order date...</h3>
        <Link to={"/signup"}>
          <button>Create an Account</button>
        </Link>
        <Link to={"/products"}>
          <button>Continue Shopping</button>
        </Link>
      </div>
    )
  }
}

export default connect()(Confirmation);
