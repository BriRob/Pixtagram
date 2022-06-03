// ms - should post be changed to comment? vvv
const GET_ALL_COMMENTS = "post/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comment/CREATE_COMMENT";

const getComments = comments => ({
  type: GET_ALL_COMMENTS,
  payload: comments
});

// Create a Post
const createComment = comment => ({
  type: CREATE_COMMENT,
  payload: comment
});

// Get the Comments for a post
export const getCommentsThunk = postId => async dispatch => {
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
export const createCommentThunk = (userId, postId, form) => async (dispatch) => {
  const { text } = form

  const response = await fetch(`/api/comments/${postId}/${userId}/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      postId,
      text
    })
  });

    if (response.ok) {
      const comment = await response.json();
      dispatch(getComments(comment))
      return comment;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    } else {
      return ['An error occured while creating a comment. Please Try again.']
    }



};


const initialState = {};

export default function comments(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_COMMENTS:
      newState = { ...state, ...action.payload };
      //   newState["comments"] = action.payload.comments
      return newState;
    // case CREATE_COMMENT:
    //   console.log("Hello from Reducer what is payload? *****", action.payload);
    //   newState = { ...state.comments, [action.payload.id]: action.payload };
    //   return newState;
    default:
      return state;
  }
}
