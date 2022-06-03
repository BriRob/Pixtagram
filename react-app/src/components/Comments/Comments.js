import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from "../../store/comment";
import LoadingSpinner from "../Spinner/Spinner";
import "./comments.css";

function Comments({ postId }) {
  const dispatch = useDispatch();
  // get comments from state, useSelector
  const comments = useSelector((state) => state?.comments?.comments_list);
  console.log("comments from COMMENTS.JS \n\n", comments);

  const [isLoaded, setIsLoaded] = useState(false);

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
              <div>{comment.user.username}</div>
              <div>{comment.text}</div>
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
