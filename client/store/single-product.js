import axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';

const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});


export const fetchProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (err) {
    console.log(err);
  }
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
