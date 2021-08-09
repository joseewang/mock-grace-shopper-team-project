import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Checkout extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div>
        <Link to={"/cart/confirmation"}>
          <button>Place Order</button>
        </Link>
      </div>
    )
  }
}

export default connect()(Checkout);