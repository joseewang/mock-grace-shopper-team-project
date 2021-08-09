  
import axios from 'axios';

// Action Constants
const SET_PRODUCTS = 'SET_PRODUCTS';

// Action Creators
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

// Thunk Creators
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (err) {
    console.log(err);
  }
};

// Products Reducer
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    // case ADD_PRODUCT_TO_CART:
    //   return action.product;
    default:
      return state;
  }
}