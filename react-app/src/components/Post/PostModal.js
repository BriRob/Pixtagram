import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePostThunk } from "../../store/post";

function PostModal({postId}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const post = useSelector((state) => state?.posts?.post);

  const userId = post?.user_id


  console.log('Hello from Modal', postId)

  const deletePost = async (e) => {
    await dispatch(deletePostThunk(postId))
    history.push(`/users/${userId}`)
  }

    return (
        <>
            <div>
                <h1>HEllo!!</h1>
                <button onClick={() => (history.push(`/posts/${postId}/edit`))}>Edit Post</button>
                <button className="delPostBtn" onClick={deletePost}>Delete Post</button>
            </div>
        </>
    )
}

export default PostModal
