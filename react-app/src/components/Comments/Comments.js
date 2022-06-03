import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from "../../store/comment";
import LoadingSpinner from "../Spinner/Spinner";
import { deleteCommentThunk } from "../../store/comment";
import "./comments.css";
import checkmark from '../CheckMark/checkmark.png'
function Comments({ postId }) {
  const dispatch = useDispatch();
  // get comments from state, useSelector
  const comments = useSelector((state) => state?.comments?.comments_list);
  const currUser = useSelector((state) => state?.session?.user?.id)
  console.log("comments from COMMENTS.JS \n\n", comments);

  console.log('This user is logged in', currUser)

  console.log("How to get to comment id---> ***", comments[0]?.id)

  const [isLoaded, setIsLoaded] = useState(false)

  const deleteComment = async (e, commentId) => {
    console.log("What is the thunk getting?", commentId)
    // // console.log(commentId)
    // console.log('current comment++++++', comments?.comment?.id)
    await dispatch(deleteCommentThunk(commentId)).then(() => dispatch(getCommentsThunk(postId)))
  }

  useEffect(async () => {
    //   console.log("rendering in comments component \n\n");
    //   if (!comments){
    await dispatch(getCommentsThunk(postId));
    //   }
  }, [dispatch]);

  return (
    <>
      {comments ? (
        <div className="comments-components">
          {/* <div>HELLO?!?!?!?!?</div>
        <div>comment</div> */}
          {comments.map((comment, idx) => (
            <div key={idx}>
              <a href={`/users/${comment.user.id}`}>{comment.user.username}{comment.user.verified? <img style={{'height':'15px'}} src={checkmark}/>: null}</a>
              <div>{comment.text}</div>
              {currUser == comment.user.id ?
                <button
                  id={`delete`}
                  onClick={(e) => deleteComment(e, comment?.id)}
                >x</button> : <p>Loading..</p>}
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Comments;
