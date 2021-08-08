import axios from 'axios';

//ACTION CONSTANTS
const SET_USERS = 'SET_USERS';

//ACTION CREATORS
const setUsers = (users) => ({
  type: SET_USERS,
  users,
});

//THUNK CREATORS--export to react components
export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch(setUsers(data));
  } catch (error) {
    console.log(error);
  }
};



//REDUCERS
export default function usersReducer (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  };
}