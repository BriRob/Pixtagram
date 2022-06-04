import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePostThunk } from "../../store/post";
import daysSincePost from "./helpers";
import { likeHeart, likeHeartFilledIn, commentIcon } from "./postIcons";
import "./post.css";
import { dotDotDotIcon } from "../Splash/SplashIcons";
import LoadingSpinner from "../Spinner/Spinner";
import PostModal from "./PostModal";
import Comments from "../Comments/Comments";
import { createCommentThunk, getCommentsThunk } from "../../store/comment";
import checkmark from "../CheckMark/checkmark.png";
import { closeButton } from "../NavBar/Navicons";

function Post() {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.post);
  //DID YOU ENCOUNTER AN ERROR?! TRY NPM INSTALL MOMENT --SAVE

  // need userId for creating a comment
  const currUser = useSelector((state) => state?.session?.user?.id);
  // console.log("Maica USER ID", currUser);
  const currPost = useSelector((state) => state?.posts?.post?.id);
  // console.log("This is current post id", currPost);
  const [owner, setOwner] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  // useState to create a comment
  const [text, setText] = useState("");
  // useState to setErrors for making comments
  const [errors, setErrors] = useState([]);

  const { postId } = useParams();
  // console.log('Hey Maica --> POST ID', postId)
  // const [date, setDate] = useState("");
  const userId = post?.user_id;
  // console.log('We need the user id', post?.user_id)

  useEffect(() => {
    if (currUser == userId) {
      setOwner(true);
    }
    dispatch(getOnePostThunk(postId))
      .then(() => dispatch(getCommentsThunk(postId)))
      .then(() => setIsLoaded(true));
  }, [isLoaded]);

  // if(isLoaded){
  //   setDate(response)
  // }
  //posting
  // const date = daysSincePost(post)

  // handleSubmit for creating a comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postId = currPost;
    const userId = currUser;
    const form = { text };
    const comment = await dispatch(createCommentThunk(userId, postId, form));
    console.log("COMMENT HERE \n\n", comment);
    // history.push(`/`)
    if (comment.errors) {
      setErrors(comment.errors);
    } else {
      await dispatch(getCommentsThunk(postId));
      setText("");
      // console.log("TROUBLE");
      // window.location.reload()
    }
  };

  console.log("post comment errors", errors);

  function changeHeart(e) {
    e.preventDefault();
    e.stopPropagation();
    likeStatus === false ? setLikeStatus(true) : setLikeStatus(false);
  }

  const openPostOptions = () => {
    setShowPostOptions(true);
  };

  if (!isLoaded) {
    return (
      <>
        <div style={{ position: "relative", top: "400px", left: "55%" }}>
          <LoadingSpinner />
        </div>
      </>
    );
  } else {
    return (
      <>
        {showPostOptions && (
          <>
            <div className="background">
              <div className="postOptionsModal">
                <div
                  onClick={() => setShowPostOptions(false)}
                  className="postOptionsModalBckg"
                ></div>
                <div className="actualModalComponent">
                  <PostModal postId={postId} />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="singlePostPage">
          <div className="postCard">
            <div className="left">
              <img className="post-picture" src={post?.img_url}></img>
            </div>
            <div className="right">
              <div className="user-info">
                <img
                  className="user-pic"
                  src={post?.user.profile_pic_url}
                ></img>

                <span className="user-name">
                  {`${post?.user?.username}`}
                  {post?.user?.verified ? (
                    <img style={{ height: "15px" }} src={checkmark} />
                  ) : null}
                </span>
                {owner && (
                  <div className="postOptions">
                    <span onClick={openPostOptions}>{dotDotDotIcon}</span>
                  </div>
                )}
              </div>
              <div className="comments">
                <div className="user-caption">
                  <img
                    className="user-pic"
                    src={post?.user.profile_pic_url}
                  ></img>
                  <span className="user-name">
                    {post?.user?.username}
                    {post?.user?.verified ? (
                      <img style={{ height: "15px" }} src={checkmark} />
                    ) : null}
                  </span>
                  <p className="caption">{post?.caption}</p>
                </div>
                <div className="comment-section">
                  {/* <p>Here go the comments</p> */}
                  <Comments postId={postId} />
                </div>
              </div>
              <div className="bottom-right">
                <div className="post-icons">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => changeHeart(e)}
                  >
                    {likeStatus === false ? likeHeart : likeHeartFilledIn}
                  </div>
                  <div
                    // onClick={(e) => console.log(e.target, "e.target", e.relatedTarget.addEventListener('text-area-box'), "e.related")}
                    className="comment-icon-post"
                  >
                    {commentIcon}
                  </div>
                </div>
                <div className="liked-by">
                  <span className="liked-by-line">{`Liked by Demo and 45 others`}</span>
                </div>
                <span>{post?.days_since}</span>
              </div>
              <div>
                <div>
                  {errors.map((error, ind) => (
                    <div id="errors" key={ind}>
                      {error}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="comment-form">
                  <textarea
                    onBlur={(e) => {
                      if (e.currentTarget === e.target) {
                        console.log("unfocused input box");
                      }
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        console.log("clicking somewhere else entirely");
                      }
                    }}
                    onFocus={(e) => {
                      if (e.currentTarget === e.target) {
                        console.log("focusing on input box");
                      }
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        console.log("clicking on myself???");
                      }
                    }}
                    // value={"text-area-box"}
                    placeholder="Add a comment."
                    // below for creating a comment
                    type="text"
                    name="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                  {/* <button disabled={true} className="post-comment-button">
                   */}
                  <button className="post-comment-button"> Post </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
