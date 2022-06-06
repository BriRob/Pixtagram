import { likeHeartIcon } from "./SplashIcons";
import { likeHeartFilledIn } from "../Post/postIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLikeThunk,
  getAllPostsThunk,
  removeLikeThunk,
} from "../../store/post";

function Likes({ post, sessionId }) {
  const dispatch = useDispatch();

  const [heartState, setHeartState] = useState(likeHeartIcon);

  //   console.log(sessionId)

  //   console.log(Object.keys(post.post_likes))
  //   console.log(typeof Object.keys(post.post_likes)[0])

  //   console.log(Object.keys(post.post_likes).includes(`${sessionId}`))

  //   const postLikesStrArr = Object.keys(post.post_likes)
  //   const postLikeNumsArr = []
  //   postLikesStrArr.forEach(strNum => {
  //     postLikeNumsArr.push(Number(strNum))
  //   })
  //   console.log("new likes arr", postLikeNumsArr)

  useEffect(() => {
    if (Object.keys(post.post_likes).includes(`${sessionId}`)) {
      // console.log("yes in likes", post.id);
      setHeartState(likeHeartFilledIn);
    }
  }, [post, sessionId]);

  async function likeAPost(e, postId, userId) {
    e.stopPropagation();
    setHeartState(likeHeartFilledIn);
    await dispatch(addLikeThunk(postId, userId));
    await dispatch(getAllPostsThunk());
    // console.log(postId, "this is postId");
    // console.log(userId, "this is the current person signed in");
  }

  async function removeLike(e, postId, userId) {
    e.stopPropagation();
    setHeartState(likeHeartIcon);
    await dispatch(removeLikeThunk(postId, userId));
    await dispatch(getAllPostsThunk());
  }

  const likeOrRemoveLike = (e, postId, userId) => {
    // console.log(heartState === likeHeartIcon);
    // console.log("filled in", heartState === likeHeartFilledIn);
    if (heartState === likeHeartIcon) {
      // console.log("heart is not filled in!");

      return likeAPost(e, postId, userId);
    } else if (heartState === likeHeartFilledIn) {
      return removeLike(e, postId, userId);
    }
  };

  return (
    <div className="likes-post-feed">
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
      <div
        className="heart-icon"
        style={{ width: "30px", cursor: "pointer" }}
        // onClick={(e) => likeAPost(e, post.id, id)}
        onClick={(e) => likeOrRemoveLike(e, post.id, sessionId)}
      >
        {/* {Object.keys(post.post_likes).includes(sessionId)
          ? likeHeartFilledIn
          : likeHeartIcon} */}
        {heartState}

        {/* {Object.keys(post.post_likes).length === 0
                        ? likeHeartIcon
                        : Object.keys(post.post_likes).includes(id)
                        ? likeHeartFilledIn
                        : likeHeartFilledIn} */}
      </div>
    </div>
  );
}

export default Likes;
