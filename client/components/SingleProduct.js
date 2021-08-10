import React from 'react';
import { connect } from 'react-redux';
import AddProdToCart from './AddProdToCart';
import { fetchProduct } from '../store/single-product';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import PictureCard from './PictureCard';

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
      <Container>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.loading && <h1>{this.state.loading}</h1>}
        <Grid container>
          {!this.state.loading && (
            <Grid item key={product.id} >
              <PictureCard product={product} />
              {/* <img src={product.imageURL} />
              <h3>{product.name}</h3>
              <h3>{product.price}</h3>
              <p>{product.description}</p> */}
              {/* add to cart button */}
              <AddProdToCart product={product} auth={this.props.auth} fetchProducts={this.props.fetchProducts}/>
            </Grid>
          )}
        </Grid>
      </Container>
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
