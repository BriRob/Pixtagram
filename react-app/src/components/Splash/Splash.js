import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import LoginForm from "../auth/LoginForm";
import "./Splash.css";
import { getUserThunk } from "../../store/user";
import { dotDotDotIcon } from "./SplashIcons";
import { addLikeThunk, getAllPostsThunk, removeLikeThunk } from "../../store/post";
import LoadingSpinner from "../Spinner/Spinner";
import { NavLink } from "react-router-dom";
// import CheckMark from "../CheckMark/CheckMark";
import checkmark from "../CheckMark/checkmark.png";
// import { getCommentsThunk } from "../../store/comment";
import SplashComments from "./SplashComments";
// import { likeHeartIcon, likeFilledHeartIcon } from "./SplashIcons";
// import { likeHeartFilledIn } from "../Post/postIcons";
import PostModal from "../Post/PostModal";
import Likes from "./Likes";
import LikesModal from "../Post/LikesModal";

function Splash() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const id = useSelector((state) => state.session.user.id);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);
  //   console.log(posts);

  // const [isLoaded, setIsLoaded] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [currPost, setCurrPost] = useState()

  const [postForViewLikes, setPostForViewLikes] = useState()
  // const [heartState, setHeartState] = useState(likeHeartIcon)

  useEffect(() => {
    dispatch(getUserThunk(id)).then(() => dispatch(getAllPostsThunk()));
    // .then(() => dispatch(getCommentsThunk()))
  }, [dispatch]);

  // const sendToProfile = (e, id) => {
  //   e.stopPropagation();
  //   // console.log("wtf");
  //   history.push(`/users/${id}`);
  // };

  if (!id) {
    return <Redirect to="/login" />;
  }


  const openPeopleLikes = (postId, post) => {
    setCurrPost(postId)
    setShowLikes(true);
    setPostForViewLikes(post)
  };

  const openPostOptions = (e, postId) => {
    setCurrPost(postId)
    setShowPostOptions(true);
  };

//   async function likeAPost(e, postId, userId) {
//     e.stopPropagation();
//     setHeartState(likeHeartFilledIn)
//     await dispatch(addLikeThunk(postId, userId));
//     await dispatch(getAllPostsThunk())
//     console.log(postId, "this is postId");
//     console.log(userId, "this is the current person signed in");
//   }

//   async function removeLike(e, postId, userId) {
//     e.stopPropagation();
//     setHeartState(likeHeartIcon)
//     await dispatch(removeLikeThunk(postId, userId))
//     await dispatch(getAllPostsThunk())
//   }

// const likeOrRemoveLike = (e, postId, userId) => {
//   console.log(heartState === likeHeartIcon)
//   console.log("filled in", heartState === likeHeartFilledIn)
//   if (heartState === likeHeartIcon) {
//     console.log("heart is not filled in!")

//     return likeAPost(e, postId, userId)
//   } else if (heartState === likeHeartFilledIn) {
//     return removeLike(e, postId, userId)
//   }
// }

  return (
    <>
      {/* <div className="home-page-body"> */}
        {showPostOptions && (
          <>
            <div className="backgroundFeed">
              <div className="postOptionsModalFeed">
                <div
                  onClick={() => setShowPostOptions(false)}
                  className="postOptionsModalBckgFeed"
                ></div>
                <div className="actualModalComponentFeed">
                  <PostModal
                    postId={currPost}
                    show={showPostOptions}
                  />
                  <div
                    className="cancelPostButtonFeed"
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
                  <LikesModal
                    views={postForViewLikes}
                    show={showLikes}
                  />
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

      <div className="stories-container"></div>
      <div className="feed">
        {posts ? (
          posts?.map((post, idx) => (
            <div key={idx}>
              <div className="post-card-feed">
                <div className="user-profile-info-feed">
                  <div className="user-profile-info">
                    <NavLink to={`/users/${post.user.id}`}>
                      <img
                      alt="user"
                        src={post.user.profile_pic_url}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "50px",
                        }}
                        className="user-profile-pic-feed"
                      ></img>
                    </NavLink>
                    <NavLink
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                      to={`/users/${post.user.id}`}
                    >
                      {post.user.username}
                      {post.user.verified ? (
                        <img alt="verified" style={{ height: "15px" }} src={checkmark}></img>
                      ) : null}
                    </NavLink>
                  </div>

                  {id === post.user.id && (
                    <>
                      <div
                        className="dotdotdot"
                        onClick={(e) => openPostOptions(e, post.id)}
                      >
                        {dotDotDotIcon}
                      </div>
                    </>
                  )}
                </div>
                <div className="feed-post-image">
                  <NavLink
                    style={{ color: "white", fontWeight: "bold" }}
                    to={`/posts/${post.id}`}
                  >
                    <img alt="user" className="user-post-image" src={post.img_url}></img>
                  </NavLink>
                </div>

                <div className="bottom-post-feed">
                  <div>
                    <Likes post={post} sessionId={id}/>
                    {/* {Object.keys(post.post_likes).length === 0 && (
                      <div></div>
                    )} */}
                    {Object.keys(post.post_likes).length === 1 && (

                    <div className="feedHowManyLikes" onClick={() => openPeopleLikes(post.id, post)}>1 like</div>
                    )}
                    {Object.keys(post.post_likes).length > 1 && (
                    <div className="feedHowManyLikes" onClick={() => openPeopleLikes(post.id, post)}>{Object.keys(post.post_likes).length} likes</div>
                    )}
                  </div>


                  {/* <div className="likes-post-feed"> */}
                    {/* <div
                      className="heart-icon"
                      style={{ width: "30px" }}
                      onClick={(e) => likeAPost(e, post.id, id)}
                    >
                      {post.post_likes[0] === undefined
                        ? likeHeartIcon
                        : post.post_likes.includes(id)
                        ? likeHeartFilledIn
                        : likeHeartFilledIn}
                    </div> */}
                    {/* <div
                      className="heart-icon"
                      style={{ width: "30px" }}
                      // onClick={(e) => likeAPost(e, post.id, id)}
                      onClick={(e) => likeOrRemoveLike(e, post.id, id)}
                    > */}
                      {/* {Object.keys(post.post_likes).includes(id) ? likeHeartFilledIn : likeHeartIcon }
                      {heartState} */}

                      {/* {Object.keys(post.post_likes).length === 0
                        ? likeHeartIcon
                        : Object.keys(post.post_likes).includes(id)
                        ? likeHeartFilledIn
                        : likeHeartFilledIn} */}
                    {/* </div> */}
                  {/* </div> */}
                  {}
                  {/* <div>{post.post_likes.length} likes</div> */}
                  {/* <div className="feedHowManyLikes">{Object.keys(post.post_likes).length} likes</div> */}

                  <div className="opinionsBox">
                    <div className="post-caption-feed">
                      {/* <img
                          src={post.user.profile_pic_url}
                          className="user-profile-pic-caption"
                        ></img> */}
                      <NavLink
                        id="id-nav"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textDecoration: "none",
                          marginRight: "15px",
                        }}
                        to={`/users/${post.user.id}`}
                      >
                        {post.user.username}
                        {post.user.verified ? (
                          <img alt="verified" style={{ height: "15px" }} src={checkmark} />
                        ) : null}
                      </NavLink>
                      {post.caption}
                    </div>

                    <div id="splash-comment-container">
                      <SplashComments post={post} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingSpinner />
        )}

      </div>
      {/* <button onClick={(e) => goToProfile(e)}>Go to profile</button> */}
      {/* </div> */}
    </>
  );
}

export default Splash;
