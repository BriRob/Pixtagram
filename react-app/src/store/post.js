const GET_ALL_POSTS = 'post/GET_ALL_POSTS'



const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});



export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/');
    if (response.ok) {
        const posts = await response.json();
        console.log(posts, "posts from the thunk!")
        dispatch(getAllPosts(posts));
    }
    return response
};


const initialState = {}

export default function posts(state = initialState, action) {
    let newState;
    switch (action.type) {
      case GET_ALL_POSTS:
        newState = {...state}
        newState['allPosts'] = action.payload
        return newState;
      default:
        return state;
    }
  }
