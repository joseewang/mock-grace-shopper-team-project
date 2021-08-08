import axios from 'axios'; 

//ACTION TYPES
const SET_SINGLE_USER = 'SET_SINGLE_USER';
// const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER';

//ACTION CREATORS
const setSingleUser = (singleUser) => ({
  type: SET_SINGLE_USER,
  singleUser,
});

// const updateSingleUserAction = (singleUser) => ({
//   type: UPDATE_SINGLE_PRODUCT,
//   singleUser,
// });

//THUNK CREATORS
export const fetchSingleUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch(setSingleUser(data));
  } catch (error) {
    console.log(error);
  };
};

// export const updateSingleUser = (id, singleUser, history) => async (dispatch) => {
//   try {
//     const { data: updated } = await axios.put(`/api/users/${id}`, singleUser);
//     dispatch(updateSingleUserAction(updated));
//     history.push(`/users/${id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

//REDUCER
export default function singleUserReducer (state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser;
    default:
      return state;
  };
};