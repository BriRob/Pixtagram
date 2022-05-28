const GET_USER = "user/getUser";
const EDIT_USER = "user/editUser";
const DELETE_USER = "user/deleteUser";

const getUser = user => ({
  type: GET_USER,
  payload: user
});

const deleteUser = user => ({
  type: DELETE_USER,
  payload: user
});

const editUser = (user) => ({
  type: EDIT_USER,
  payload: user
});

// Get User
export const getUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if (response.ok) {
    const user = await response.json();
    dispatch(getUser(user));
  }
  return response
};

// Edit Thunk
export const editUserThunk = (userId, form) => async dispatch => {
  console.log("WE GOT HERE")

  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }

  const response = await fetch(`/api/users/${userId}/edit`, option);
  if (response.ok) {
    const user = await response.json();
    // console.log("EDIT THUNK SHOULD BE JSON---->", user)
    dispatch(editUser(user));
  }
  return response
};


const initialState = {}

const userReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_USER:
      newState = {...state}
      newState.user = action.payload
      // return { user: action.payload };
      return newState
    case EDIT_USER:
      newState = {...state}
      newState.user = action.payload.user
      return newState
      // return {...state: action.payload}
    default:
      return state;
  }
}

export default userReducer
