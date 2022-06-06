// ms - should post be changed to comment? vvv
const GET_ALL_COMMENTS = "comment/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comment/CREATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";
// const GET_ONE_COMMENT = "comment/GET_ONE_COMMENT";

// const getOneComment = comment => ({
//   type: GET_ONE_COMMENT,
//   payload: comment
// })

const getComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  payload: comments,
});

// Create a Post
// const createComment = comment => ({
//   type: CREATE_COMMENT,
//   payload: comment
// });

// Delete a Comment
const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

//Get a single comment
// export const getOneCommentThunk = commentId => async (dispatch) => {
//   console.log("Hi from the single comment thunk \n\n")
//   const response = await fetch(`/api/comments/${commentId}/single-comment`)
//   if (response.ok){
//     const comment = await response.json();
//     dispatch(getOneComment(comment))
//   }
//   return response;
// }

// Get the Comments for a post
export const getCommentsThunk = (postId) => async (dispatch) => {
  // console.log("HELLO FROM BEGINNING OF COMMENTS THUNK \n\n")
  // console.log(postId)
  const response = await fetch(`/api/comments/${postId}`);
  if (response.ok) {
    const comments = await response.json();
    // console.log(comments, "comments from the thunk!");
    dispatch(getComments(comments));
  }
  return response;
};

// Create a Comment
export const createCommentThunk =
  (userId, postId, form) => async (dispatch) => {
    const { text } = form;

    const response = await fetch(`/api/comments/${postId}/${userId}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        postId,
        text,
      }),
    });

    if (response.ok) {
      const comment = await response.json();
      dispatch(getComments(comment));
      return comment;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ["An error occurred while creating a comment. Please Try again."];
    }
  };

// Delete a Comment
export const deleteCommentThunk = (commentId) => async (dispatch) => {
  // console.log("Hello from DELETE THUNK")
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  // console.log("WHat is wrong with the response?", response)
  if (response.ok) {
    const comment = await response.json();
    dispatch(deleteComment(comment));
  }
  return response;
};

const initialState = {};

export default function comments(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_COMMENTS:
      newState = { ...state, ...action.payload };
      //   newState["comments"] = action.payload.comments
      return newState;
    case CREATE_COMMENT:
      // let comment;
      // console.log("Hello from Reducer what is payload? *****", action.payload.id);
      newState = { ...state.comments, [action.payload.id]: action.payload };
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      // console.log('<-----Hello from delete comment reducer---->')
      delete newState.comment;
      return newState;
    // case GET_ONE_COMMENT:
    //   // console.log('HELLO FROM ONE COMMENT REDUCER \n\n')
    //   newState = {...state};
    //   return newState.comment = action.payload
    default:
      return state;
  }
}
