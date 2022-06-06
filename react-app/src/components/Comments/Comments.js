import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from "../../store/comment";
import LoadingSpinner from "../Spinner/Spinner";
import { deleteCommentThunk } from "../../store/comment";
import "./comments.css";
import checkmark from "../CheckMark/checkmark.png";
import { closeButton } from "../NavBar/Navicons";
import { Link, NavLink } from "react-router-dom";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state?.comments?.comments_list);
  const currUser = useSelector((state) => state?.session?.user?.id);

  // const [isLoaded, setIsLoaded] = useState(false)

  const deleteComment = async (e, commentId) => {
    // console.log("What is the thunk getting?", commentId)
    await dispatch(deleteCommentThunk(commentId)).then(() =>
      dispatch(getCommentsThunk(postId))
    );
  };

  useEffect(() => {
    dispatch(getCommentsThunk(postId));
    //   }
  }, [dispatch]);

  return (
    <>
      {/* <div className="page-container"> */}
        {comments ? (
          <div className="comments-components">
            {comments.map((comment, idx) => (
              <div className="comments-container" key={idx}>
                <div id="profile-pic-holder">
                  <Link to={`/users/${comment.user.id}`}>
                    <img
                      id="profile-pic"
                      src={comment.user.profile_pic_url}
                      alt="profile-pic"
                    ></img>
                  </Link>
                </div>
                <div className="username-comment-container">
                  <div id="comment">
                    <NavLink id="username" to={`/users/${comment.user.id}`}>
                      {comment.user.username}
                      {comment.user.verified ? (
                        <img
                          style={{ height: "15px" }}
                          src={checkmark}
                          alt="checkmark"
                        />
                      ) : null}
                    </NavLink>{" "}
                    {comment.text}
                  </div>
                </div>
                <div className="deleteCommentButton">
                  {currUser === comment.user.id && (
                    <div
                      className="delete"
                      onClick={(e) => deleteComment(e, comment?.id)}
                    >
                      {closeButton}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      {/* </div> */}
    </>
  );
}

export default Comments;
