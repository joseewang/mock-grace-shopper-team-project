import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/single-product';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    try {
      const { id } = this.props.match.params;
      this.props.fetchProduct(id);
    } catch (err) {
      this.setState({ error: err.message, loading: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.product === this.props.product) {
      return;
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    const { product } = this.props;
    return (
      <div>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.loading && <h1>{this.state.loading}</h1>}
        <div>
          {!this.state.loading && (
            <div>
              <img src={product.imageURL} />
              <h3>{product.name}</h3>
              <h3>{product.price}</h3>
              <p>{product.description}</p>
              {/* add to cart button */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
