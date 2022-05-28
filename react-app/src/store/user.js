const GET_USER = "user/GET_USER";
const EDIT_USER = "user/EDIT_USER";
const DELETE_USER = "user/DELETE_USER";

const getUser = user => ({
  type: GET_USER,
  payload: user
});

const deleteUser = user => ({
  type: DELETE_USER,
  payload: user
});

const editUser = user => ({
  type: EDIT_USER,
  payload: user
});

// Get User
export const getUserThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getUser(data));
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
        const data = await response.json();
        console.log("EDIT THUNK SHOULD BE JSON---->", data)
      if (data.errors) {
        return data.errors;
      }

      dispatch(editUser(data));
    }
    return response
  };

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      console.log("ACTION PAYLOAD ------", action.payload);
      return { user: action.payload };
    //   case DELETE_USER:
    //     return { user: null }
    case EDIT_USER:
        const newState = {...state, [state.user]: action.payload}
        return newState
    default:
      return state;
  }
}
