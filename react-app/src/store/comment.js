const GET_ALL_COMMENTS = "post/GET_ALL_COMMENTS";

const getComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  payload: comments,
});

export const getCommentsThunk = (postId) => async (dispatch) => {
    console.log("HELLO FROM BEGINNING OF COMMENTS THUNK \n\n")
    console.log(postId)
    const response = await fetch(`/api/comments/${postId}`);
    if (response.ok) {
      const comments = await response.json();
      console.log(comments, "comments from the thunk!");
      dispatch(getComments(comments));
    }
    console.log("I failed ===========")
    console.log("RESPONSE \n\n", response)
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
    default:
        return state
  }
}
