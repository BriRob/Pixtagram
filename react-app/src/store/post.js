const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const GET_ONE_POST = "post/GET_ONE_POST";
// const CREATE_POST = "post/CREATE_POST";
// const EDIT_POST = "user/EDIT_POST";
const DELETE_POST = "post/DELETE_POST"

const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  payload: posts,
});

const getOnePost = (post) => ({
  type: GET_ONE_POST,
  payload: post,
});

// const createPost = (post) => ({
//   type: CREATE_POST,
//   payload: post,
// });

// const editPost = (post) => ({
//   type: EDIT_POST,
//   payload: post,
// });

const deletePost = (post) => ({
  type: DELETE_POST,
  payload: post,
});

export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const posts = await response.json();
    console.log(posts, "posts from the thunk!");
    dispatch(getAllPosts(posts));
  }
  return response;
};

export const getOnePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const post = await response.json();
    dispatch(getOnePost(post));
  }
  return response;
};

// create post
export const createPostThunk = (userId, form) => async (dispatch) => {
  const { img_url, caption } = form;
  const formData = new FormData();

  formData.append("img_url", img_url);
  formData.append("caption", caption);

  const option = {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
    body: formData,
  };
  // console.log('INSIDE CREATE POST THUNK \n\n');
  const response = await fetch(`/api/posts/${userId}/new`, option);
  // console.log('FETCH RESPONSE FROM CREATE POST', response);
  if (response.ok) {
    const post = await response.json();
    // console.log(post, "one post from the thunk!")
    // dispatch(createPost(post));
    dispatch(getOnePost(post));
    return post
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      return ["An error occurred. Please try again."];
    }
  }
  // return response
};


// Edit Post Thunk
export const editPostThunk = (postId, form) => async (dispatch) => {

  const { caption } = form
  const formData = new FormData();

  formData.append("caption", caption);
  console.log("FORMDATA \n\n", formData["caption"])


  const option = {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  };

  // console.log("option \n\n", option)
  // console.log("option.body \n\n", option.body)

  const response = await fetch(`/api/posts/${postId}/edit`, option);
  if (response.ok) {
    const post = await response.json();
    // dispatch(editPost(user));
    dispatch(getOnePost(post));
    return post
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

// Delete Post Think
export const deletePostThunk = (postId) => async (dispatch) => {
  console.log('<--------- HELLO From DELETE POST THUNK -------->')
  const response = await fetch(`/api/posts/${postId}/delete`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(deletePost(post))
  }
  return response;
}


const initialState = {};

export default function posts(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      newState["allPosts"] = action.payload;
      return newState;
    case GET_ONE_POST:
      newState = { ...state };
      newState.post = action.payload;
      return newState;
    case DELETE_POST:
      newState = {...state}
      // console.log('HELLO FROM DELETE REDUCER')
      delete newState.post
      return newState
    default:
      return state;
  }
}
