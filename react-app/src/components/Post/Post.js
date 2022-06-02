import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePostThunk} from "../../store/post";
import daysSincePost from "./helpers";
import { likeHeart, likeHeartFilledIn, commentIcon } from "./postIcons";
import "./post.css";
import { dotDotDotIcon } from "../Splash/SplashIcons";
import PostModal from "./PostModal";

function Post() {
  const dispatch = useDispatch();
  const history = useHistory()
  const post = useSelector((state) => state?.posts?.post);
  //DID YOU ENCOUNTER AN ERROR?! TRY NPM INSTALL MOMENT --SAVE

  const [likeStatus, setLikeStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [date, setDate] = useState("");

  const { postId } = useParams();

  // console.log('We need the user id', post?.user_id)

  const userId = post?.user_id

  useEffect(() => {
    dispatch(getOnePostThunk(postId)).then(() => setIsLoaded(true));
  }, [isLoaded]);

  // if(isLoaded){
  //     const response = daysSincePost(post)
  //     setDate(response)
  // }
  //posting

  function changeHeart(e) {
    e.preventDefault();
    e.stopPropagation();
    likeStatus === false ? setLikeStatus(true) : setLikeStatus(false);
  }

  const openPostOptions = () => {
    setShowPostOptions(true);
  };



  if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        {showPostOptions && (
          <>
            <div className="background">
              <div className="postOptionsModal">
                <button onClick={() => setShowPostOptions(false)}>X</button>
                < PostModal postId={postId}/>
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
                <span className="user-name">{post?.user.username}</span>
                <div className="postOptions">
                  <span onClick={openPostOptions}>{dotDotDotIcon}</span>
                </div>
              </div>
              <div className="comments">
                <div className="user-caption">
                  <img
                    className="user-pic"
                    src={post?.user.profile_pic_url}
                  ></img>
                  <span className="user-name">{post?.user.username}</span>
                  <p className="caption">{post?.caption}</p>
                </div>
                <div className="comment-section">
                  <p>Here go the comments</p>
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
                <span>{`Posted Date${date}`}</span>
              </div>
              <div>
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
                ></textarea>
                <button disabled={true} className="post-comment-button">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
