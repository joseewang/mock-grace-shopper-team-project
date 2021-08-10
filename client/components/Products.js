import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import AddProdToCart from './AddProdToCart';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import PictureCard from './PictureCard';



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
      <Container>
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.loading && <h1>{this.state.loading}</h1>}          
          <Grid container>
          {!this.state.loading &&
            this.props.products.map((product) => {
              return (
                <Grid item key={product.id} xs={12} md={6} lg={4}>
                  <Link to={`/products/${product.id}`}>
                    <PictureCard product={product} />
                  </Link>
                  <AddProdToCart product={product} auth={this.props.auth} fetchProducts={this.props.fetchProducts}/>
                </Grid>
              );
            })}
            </Grid>
      </Container>
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
