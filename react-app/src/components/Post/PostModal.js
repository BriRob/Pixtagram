import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePostThunk } from "../../store/post";
import './post.css'
function PostModal({postId}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const post = useSelector((state) => state?.posts?.post);

  const userId = post?.user_id


  console.log('Hello from Modal', postId)

  const deletePost = async (e) => {
    await dispatch(deletePostThunk(postId))
    history.push(`/`)
  }

    return (
        <>
            <div className="editPostModal">
                <div className="delPostBtn" onClick={deletePost}>Delete</div>
                <div onClick={() => (history.push(`/posts/${postId}/edit`))} className='editPostButton'>Edit</div>
            </div>
        </>
    )
}

export default PostModal
