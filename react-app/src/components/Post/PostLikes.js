import { likeHeartFilledIn } from "./postIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLikeThunk,
  getAllPostsThunk,
  getOnePostThunk,
  removeLikeThunk,
} from "../../store/post";
import { likeHeartIcon } from "../Splash/SplashIcons";

function PostLikes({ post, sessionId }) {
  const dispatch = useDispatch();
  // console.log(sessionId);
  // console.log(post);

  const [heartState, setHeartState] = useState(likeHeartIcon);


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
    await dispatch(getOnePostThunk(postId));
    await dispatch(getAllPostsThunk(postId));
    // console.log(postId, "this is postId");
    // console.log(userId, "this is the current person signed in");
  }

  async function removeLike(e, postId, userId) {
    e.stopPropagation();
    setHeartState(likeHeartIcon);
    await dispatch(removeLikeThunk(postId, userId));
    await dispatch(getOnePostThunk(postId));
    await dispatch(getAllPostsThunk(postId));

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
    <div className="likes-post">
      <div
        className="heart-icon"
        style={{ width: "30px", cursor: "pointer" }}
        onClick={(e) => likeOrRemoveLike(e, post.id, sessionId)}
      >
        {heartState}
      </div>
    </div>
  );
}

export default PostLikes;
