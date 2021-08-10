import axios from 'axios'

const TOKEN = 'token'

// Action Constants
export const SET_CART = 'SET_CART';

// Action Creators
export const setCart = (cart) => ({
  type: SET_CART,
  cart
});

// Thunk Creators
export const fetchCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get('/api/cart', {
      headers: {
        authorization: token
      }
    })
    dispatch(setCart(data))
  } catch (err) {
    console.log(err);
  }
}

export const addToCart = (productId, userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
      const { data } = await axios.put(
        `/api/products/${productId}/users/${userId}`,
        undefined,
        { headers: { authorization: token } }
      )
      dispatch(setCart(data))
    }
  } catch (err) {
    console.log(err);
  }
}

//cart in arg is either products array (for delete) or item id (for inc/dec)
export const updateCartThunk = (cart, method) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    //cart PRODUCTS SUB-ARRAY with item removed already
    //or with quantity changed
    const { data } = await axios.put('/api/cart', { method, cart }, {
      headers: {
        authorization: token
      }
    })
    //RETURNS CART INSTANCE WITH {id, userID, products: []}
    dispatch(setCart(data))
    //set cart with whole cart OBJECT, not just products sub-array
  } catch (err) {
    console.log(err);
  }
}

// Products Reducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart || {};
    default:
      return state
  }
}

