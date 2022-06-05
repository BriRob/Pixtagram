import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentThunk,
  getCommentsThunk,
  getOneCommentThunk,
} from "../../store/comment";
import LoadingSpinner from "../Spinner/Spinner";
import { deleteCommentThunk } from "../../store/comment";
import checkmark from "../CheckMark/checkmark.png";
import { closeButton } from "../NavBar/Navicons";
import { NavLink, useHistory } from "react-router-dom";
import { getAllPostsThunk } from "../../store/post";

import "./SplashComments.css";

function SplashComments({ post }) {
  // console.log('one post MAICA \n\n', post)
  const postId = post.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //Need comments specific to the post or postId
  // console.log('CURRENT POST \n\n', currPost)
  // const commentsM = currPost.comments
  // console.log('Are these the comments you seek?? \n\n', commentsM)

  const commentsFromPostState = useSelector(
    (state) => state?.posts?.allPosts?.posts?.[post]?.comments
  );

  // console.log(`What are comments?? for This post:${post} FROM THE POST\n\n`, commentsFromPostState)

  // useEffect(() => {
  //   dispatch
  // })
  // useEffect(() => {
  //   // dispatch(getOnePostThunk(postId))
  // dispatch(getCommentsThunk(post))
  //   // then(() => dispatch(getCommentsThunk(post)))
  //   // .then(() => dispatch(getOneCommentThunk()))
  //   // .then(() => dispatch(getOnePostThunk(postId)))
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch
  // })

  // console.log('You need post comments \n\n', post)

  const comments = post.comments;
  // console.log(`THESE ARE COMMENTS for POST ${post.id} \n\n`, comments)
  // const comments = useSelector((state) => state?.comments?.comments_list);
  // console.log('Need one comment please', comments)

  // console.log('WHat is in comments?\n\n', comments)
  const currUser = useSelector((state) => state?.session?.user?.id);
  // const currUser = useSelector((state) => state?.session?.user?.id);
  // // console.log("Maica USER ID", currUser);
  // const currPost = useSelector((state) => state?.posts?.post?.id)

  // need to grab comment text somehow
  // const textC = comments[0]?.text

  // console.log('Help \n\n',comments.comment)

  //will delete the comment if it belongs to the user - need to find a way to get current comment it
  // const deleteComment = async (e, commentId) => {
  //     console.log("What is the thunk getting?", commentId)
  //     await dispatch(deleteCommentThunk(commentId)).then(() => dispatch(getCommentsThunk(postId)))
  //   }

  //will post a comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const postId = currPost;
    // console.log('CURRPOST -MS \n\n', postId)
    const userId = currUser;
    // console.log('USERID -MS \n\n', userId)
    const form = { text };

    const comment = await dispatch(createCommentThunk(userId, postId, form));
    setText("");
    if (comment.errors) {
      setErrors(comment.errors);
    } else {
      await dispatch(getAllPostsThunk());
    }
  };

  let comment;
  // {console.log("MAICA THIS IS THE LENGTH OF A COMMENT \n\n", comment[0])}

  return (
    <>
      {comments && (
        <>
          <div id="s-parent">
            {/* Only render the following if there are comments*/}
            {comments.length > 0 && (
              <>
                <div id="s-comment-container">
                  {/* First Comment */}
                  {/* If post has more than one comment render this */}
                  {comments.length === 1 && (
                    <>
                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${comments[0]?.user?.id}`}
                          >
                            {comments[0]?.user?.username}
                          </NavLink>
                        </p>

                        <p id="s-comment">
                          {/* { showMore ? {comments[0]?.text}.length : {comments[0]?.text}.substring(0, 10)}} */}
                          {comments[0]?.text}
                        </p>
                      </div>
                    </>
                  )}
                  {comments.length > 1 && (
                    <>
                      {comments.length > 2 && (
                        <div id="s-nav">
                          <NavLink id="navlink" to={`/posts/${postId}`}>
                            View all {comments?.length} comments
                          </NavLink>
                        </div>
                      )}

                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${comments[0]?.user?.id}`}
                          >
                            {comments[0]?.user?.username}
                          </NavLink>
                        </p>
                        <p id="s-comment">
                          {/* { showMore ? {comments[0]?.text}.length : {comments[0]?.text}.substring(0, 10)}} */}
                          {comments[0]?.text}
                        </p>
                      </div>
                      <div id="username-comment">
                        <p id="s-username">
                          <NavLink
                            className="s-username"
                            to={`/users/${
                              comments[comments.length - 1]?.user?.id
                            }`}
                          >
                            {comments[comments.length - 1]?.user?.username}
                          </NavLink>
                        </p>

                        <p id="s-comment">
                          {comments[comments.length - 1]?.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <div id="s-line"></div>
            <div id="s-comment-form">
              <form id="splash-comment-form" onSubmit={handleSubmit}>
                <input
                  id="s-input"
                  placeholder="Add a comment.."
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  name="text"
                  value={text}
                  // maxLength={5}
                ></input>
                <button id="post-button" disabled={!text || text.length > 140}>
                  Post
                </button>
              </form>

              {/* ERRORS RENDERING HERE!!!!!!!!! */}
              {errors && (
                <>
                  <div id="errors-render">
                    {errors.map((error, ind) => (
                      <div id="errors" key={ind}>
                        {error}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SplashComments;
