import axios from 'axios'

const TOKEN = 'token'

// Action Constants
export const SET_CART = 'SET_CART';
const ADD_TO_CART = "ADD_TO_CART"

// Action Creators
export const setCart = (cart) => ({
  type: SET_CART,
  cart
});

const _addToCart = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  product
})


// Thunk Creators
export const fetchCart = (token) => async (dispatch) => {
  try {
    const {data} = await axios.get('api/cart', {
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
      await axios.put(`/api/products/${productId}/users/${userId}`, {
        headers: {
          authorization: token
        }
      }
      )
      const { data } = await axios.get('/api/cart', {
        headers: {
          authorization: token
        }
      })
      dispatch(setCart(data))
      return
    }
  } catch (err) {
    console.log(err);
  }
}

export const updateCartThunk = (cart, token) => async (dispatch) => {
  try {
    console.log('cart in thunk ', cart) //ok
    const { data } = await axios.put('/api/cart', cart, {
      headers: {
        authorization: token
      }
    })
    console.log('data returned from express ', data) //has one more item than cart sent out so item doesn't delete
    dispatch(setCart(data))
    //make sure you're sending whole cart back
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