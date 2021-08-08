import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import AddProdToCart from './AddProdToCart'
import { Link } from 'react-router-dom'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    try {
      this.props.fetchProducts();
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products === this.props.products) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.loading && <h1>{this.state.loading}</h1>}
        <div>
          {!this.state.loading &&
            this.props.products.map((product) => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageURL} />
                    <h3>{product.name}</h3>
                    <h3>{product.price}</h3>
                    <p>{product.description}</p>
                  </Link>
                  <AddProdToCart product={product} auth={this.props.auth} fetchProducts={this.props.fetchProducts}/>

                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);
