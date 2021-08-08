import axios from 'axios';

// Action Constants
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"

// Action Creators
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const _addProductToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

// Thunk Creators
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  } catch (err) {
    console.log(err);
  }
};

export const addProductToCart = (productId, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/products/${productId}/users/${userId}`);
    dispatch(_addProductToCart(data))
  } catch (err) {
    console.log(err);
  }
}

// Products Reducer
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT_TO_CART:
      return action.product;
    default:
      return state;
  }
}