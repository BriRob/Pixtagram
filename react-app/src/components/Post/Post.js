import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { getOnePostThunk } from "../../store/post";
// import daysSincePost from "./helpers";
import { commentIcon } from "./postIcons";
import "./post.css";
import { dotDotDotIcon } from "../Splash/SplashIcons";
import LoadingSpinner from "../Spinner/Spinner";
import PostModal from "./PostModal";
import Comments from "../Comments/Comments";
import { createCommentThunk, getCommentsThunk } from "../../store/comment";
import checkmark from "../CheckMark/checkmark.png";
// import { closeButton } from "../NavBar/Navicons";
import PostLikes from "./PostLikes";
import LikesModal from "./LikesModal";

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
  // const [owner, setOwner] = useState(false);
  // const [likeStatus, setLikeStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  // useState to create a comment
  const [text, setText] = useState("");
  // useState to setErrors for making comments
  const [errors, setErrors] = useState([]);

  const [showLikes, setShowLikes] = useState(false);
  const [postForViewLikes, setPostForViewLikes] = useState();

  const { postId } = useParams();
  // console.log('Hey Maica --> POST ID', postId)
  // const [date, setDate] = useState("");
  const userId = post?.user_id;
  // console.log('We need the user id', post?.user_id)

  useEffect(async () => {
    // if (currUser == userId) {
    //   setOwner(true);
    // }

    let response = await dispatch(getOnePostThunk(postId));

    if (response.id === undefined) {
      history.push("/page-not-found");
    }
    dispatch(getCommentsThunk(postId)).then(() => setIsLoaded(true));
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
    // console.log("COMMENT HERE \n\n", comment);
    // history.push(`/`)
    if (comment.errors) {
      // console.log("COMMENT ERRORS \n\n", comment.errors);

      setErrors(comment.errors);
    } else {
      await dispatch(getCommentsThunk(postId));
      setText("");
      // console.log("TROUBLE");
      // window.location.reload()
    }
  };

  //
  const toProfile = (e) => {
    history.push(`/users/users/${post?.user?.id}`);
  };

  // console.log("post comment errors", errors);

  // function changeHeart(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   likeStatus === false ? setLikeStatus(true) : setLikeStatus(false);
  // }

  const openPostOptions = () => {
    setShowPostOptions(true);
  };

  const openPeopleLikes = (post) => {
    setShowLikes(true);
    setPostForViewLikes(post);
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
                  <PostModal postId={postId} show={showPostOptions} />
                  <div
                    className="cancelPostButton"
                    onClick={() => setShowPostOptions(false)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showLikes && (
          <>
            <div className="backgroundFeed">
              <div className="postOptionsModalFeed">
                <div
                  onClick={() => setShowLikes(false)}
                  className="postOptionsModalBckgFeed"
                ></div>
                <div className="actualModalComponentFeed">
                  <LikesModal views={postForViewLikes} show={showLikes} />
                  <div
                    className="closeLikesModal"
                    onClick={() => setShowLikes(false)}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div id="parent">
          <div className="singlePostPage">
            <div className="postCard">
              <div className="left">
                <Link to={`/users/${post?.user?.id}`}>
                  <img
                    className="post-picture"
                    src={post?.img_url}
                    alt="post"
                  ></img>
                </Link>
              </div>
              <div className="right">
                <div className="user-info">
                  <NavLink to={`/users/${post?.user.id}`}>
                    <img
                      alt="user"
                      className="user-pic"
                      src={post?.user.profile_pic_url}
                    ></img>
                  </NavLink>

                  <a id="hide-me" href={`/users/${post?.user?.id}`}>
                    <span className="user-name">
                      {`${post?.user?.username}`}
                      {post?.user?.verified ? (
                        <img
                          style={{ height: "15px" }}
                          src={checkmark}
                          alt="verified"
                        />
                      ) : null}
                    </span>
                  </a>
                  {currUser === userId && (
                    <div className="postOptions">
                      <span onClick={openPostOptions}>{dotDotDotIcon}</span>
                    </div>
                  )}
                </div>
                <div className="comments">
                  <div className="user-caption">
                    <img
                      alt="user"
                      className="user-pic"
                      src={post?.user.profile_pic_url}
                    ></img>
                    <span className="user-name">
                      {post?.user?.username}
                      {post?.user?.verified ? (
                        <img
                          style={{ height: "15px" }}
                          src={checkmark}
                          alt="verified"
                        />
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
                  <div></div>
                  {/* p-line crates the lines */}
                  <div className="p-line"></div>

                  <div className="post-icons">
                    {/* <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => changeHeart(e)}
                  >
                    {likeStatus === false ? likeHeart : likeHeartFilledIn}
                  </div> */}

                    <div>
                      <PostLikes post={post} sessionId={currUser} />
                    </div>

                    <div
                      // onClick={(e) => console.log(e.target, "e.target", e.relatedTarget.addEventListener('text-area-box'), "e.related")}
                      className="comment-icon-post"
                    >
                      <label htmlFor="for-input-focus">{commentIcon}</label>
                    </div>
                  </div>
                  <div className="liked-by">
                    {/* <span className="liked-by-line">{`Liked by Demo and 45 others`}</span> */}
                    {Object.keys(post.post_likes).length === 0 && (
                      <div className="liked-by-line">Be the first to like</div>
                    )}
                    {Object.keys(post.post_likes).length === 1 && (
                      <div
                        className="liked-by-line"
                        onClick={() => openPeopleLikes(post)}
                      >
                        1 like
                      </div>
                    )}
                    {Object.keys(post.post_likes).length > 1 && (
                      <div
                        className="liked-by-line"
                        onClick={() => openPeopleLikes(post)}
                      >
                        {Object.keys(post.post_likes).length} likes
                      </div>
                    )}
                  </div>
                  <span id="date">{post?.days_since}</span>

                  <div className="p-line"></div>

                  <div>
                    {text.length > 140 && (
                      <div>
                        {errors.map((error, ind) => (
                          <div id="errors" key={ind}>
                            {error}
                          </div>
                        ))}
                      </div>
                    )}
                    <div id="form-container">
                      <form onSubmit={handleSubmit} autoComplete="off" id="comment-form">
                        <textarea
                          className="comment-form"
                          id="for-input-focus"
                          onBlur={(e) => {
                            if (e.currentTarget === e.target) {
                              // console.log("unfocused input box");
                            }
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              // console.log("clicking somewhere else entirely");
                            }
                          }}
                          onFocus={(e) => {
                            if (e.currentTarget === e.target) {
                              // console.log("focusing on input box");
                            }
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              // console.log("clicking on myself???");
                            }
                          }}
                          // value={"text-area-box"}
                          placeholder="Add a comment..."
                          // below for creating a comment
                          type="text"
                          name="text"
                          onChange={(e) => setText(e.target.value)}
                          value={text}
                          rows="2"
                          cols="28"
                        ></textarea>
                        {/* <button disabled={true} className="post-comment-button">
                         */}
                        <button disabled={!text} id="post-comment-button">
                          {" "}
                          Post{" "}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div id='footer'>
            <div id='footer-line'></div>
           </div> */}
        </div>
      </>
    );
  }
}

export default Post;
