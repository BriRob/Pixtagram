const GET_ALL_USERS = "user/getAllUsers";
const GET_USER = "user/getUser";
const GET_FOLLOWERS = "user/getFollowers";
const GET_FOLLOWING = "user/getFollowing";
const EDIT_USER = "user/editUser";
const DELETE_USER = "user/deleteUser";

const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

const getFollowers = (followers) => ({
  type: GET_FOLLOWERS,
  payload: followers
})

const getFollowing = (following) => ({
  type: GET_FOLLOWING,
  payload: following
})

const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

const editUser = (user) => ({
  type: EDIT_USER,
  payload: user,
});

// Get All Users
export const getAllUsersThunk = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);
  if (response.ok) {
    const users = await response.json();
    dispatch(getAllUsers(users));

    // console.log(users.users)

    return users.users;
  }
};

// Get User
export const getUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if (response.ok) {
    // console.log('woahhhhh it looks like you should not have gotten here')
    const user = await response.json();
    dispatch(getUser(user));
    return user
  }
  return response;
};

// Get Followers
export const getFollowersThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/followers/${userId}`);
  // console.log("THUNK RES", response);

  if (response.ok) {
    const followers = await response.json();
    // console.log('HERE ARE YOUR FOLLOWERS \n\n', followers)
    dispatch(getFollowers(followers));
    return followers
  }
  return response;
};

// Get Following
export const getFollowingThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/following/${userId}`);
  if (response.ok) {
    const following = await response.json();
    // console.log('HERE is your following \n\n', following)
    dispatch(getFollowing(following));
    return following
  }
  return response;
};

// Create Follow
export const createFollow = (userId, followingUserId) => async(dispatch) => {
 const options = { method: "PUT"}
 const response = await fetch(`/api/users/follow/${userId}/${followingUserId}`, options)
 const follow = await response.json();
 return follow;
}

// Delete Follow
export const deleteFollow = (userId, followingUserId) => async(dispatch) => {
  const options = { method: "DELETE"}
  const response = await fetch(`/api/users/unfollow/${userId}/${followingUserId}`, options)
  const follow = await response.json();
  return follow;
 }


// Edit Thunk
export const editUserThunk = (userId, form) => async (dispatch) => {

  const { full_name, bio, profile_pic_url } = form
  const formData = new FormData();

  formData.append("full_name", full_name);
  formData.append("profile_pic_url", profile_pic_url);
  formData.append("bio", bio);
  // console.log("FORMDATA \n\n", formData["full_name"])


  const option = {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  };

  // console.log("option \n\n", option)
  // console.log("option.body \n\n", option.body)

  const response = await fetch(`/api/users/${userId}/edit`, option);
  if (response.ok) {
    const user = await response.json();
    dispatch(editUser(user));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
     return ['An error occurred. Please try again.']
    }
  }
  return response;
};

//Delete user
export const deleteUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/delete`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const user = await response.json();
    dispatch(deleteUser(user));
  }
  return response;
};

const initialState = {};

export default function userReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      const allUsers = {}
      action.users.users.forEach((user) => {
        allUsers[user.id] = user
      })
      // console.log("users array from backend", action.users.users)
      // console.log("allUsers obj", allUsers)
      newState = { ...state, users: allUsers };
      // newState = { ...state, ...action.users };
      // newState.users = action.users
      return newState;

    case GET_USER:
      newState = { ...state };
      newState.user = action.payload;
      return newState;

    case GET_FOLLOWERS:
      newState = { ...state };
      newState.userFollowers = action.payload;
      return newState;

    case GET_FOLLOWING:
      newState = { ...state };
      newState.userFollowing = action.payload;
      return newState;

    case EDIT_USER:
      newState = { ...state };
      newState.user = action.payload.user;
      return newState;

    case DELETE_USER:
      newState = {...state}
      // console.log('deleted newState.session :D')
      delete newState.user
      // console.log(delete newState['user'])
      // console.log(newState.session)
      // delete newState.session
      // console.log(newState);
      return newState


    default:
      return state;
  }
}
