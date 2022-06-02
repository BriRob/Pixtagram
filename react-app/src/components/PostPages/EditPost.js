import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOnePostThunk } from "../../store/post";

function EditPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  // grab post from redux state
  const currPost = useSelector((state) => state.posts.post);

  const [caption, setCaption] = useState(currPost?.caption);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const controller = new AbortController();

    if (currPost) {
      await dispatch(getOnePostThunk(postId));
      setIsLoaded(true);
    } else {
      history.push(`/posts/${postId}`);
      return () => controller.abort();
    }
  }, [dispatch]);

  const handleCancel = async (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}`);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  };




  if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="edit-post-page">
        <h1>Edit Post!!!!</h1>
        <img src={currPost.img_url}></img>
        <div className="edit-post-inner">
          <form onSubmit={handleSubmit} className="editPostForm">
            <div>
              {errors.map((error, ind) => (
                <div id="errors" key={ind}>
                  {error}
                </div>
              ))}
            </div>
            <label>
              Caption
              <textarea
                name="caption"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              ></textarea>
            </label>
            <button className="editSubmitPostBtn">Share</button>
            <button className="editPostCancelBtn" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
