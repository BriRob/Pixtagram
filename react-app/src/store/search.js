const ADD_USERS = 'search/add_users';

const addAllUsers = (users) => ({
    type: ADD_USERS,
    payload: users
});



export const findUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/all', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const users = await response.json();
        dispatch(addAllUsers(users));
    }
}

const initialState = { users: null };


export default function searchReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_USERS:
            newState = { ...state, ...{...action.payload } }
            return newState
        default:
            return state;
    }
}
