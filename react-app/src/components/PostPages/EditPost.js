import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPostThunk, getOnePostThunk } from "../../store/post";
import "./modals.css";

function EditPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  // grab post from redux state
  const user = useSelector((state) => state?.session?.user);
  const currPost = useSelector((state) => state?.posts?.post);

  const [caption, setCaption] = useState(currPost?.caption);
  // const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    // const controller = new AbortController();

    let response = await dispatch(getOnePostThunk(postId));

    if (response.id === undefined) {
      history.push("/page-not-found");
    } else if (response.user_id !== user.id) {
      history.push(`/posts/${postId}`);
    } else {
      setCaption(response.caption);
      setIsLoaded(true);
    }

    // if (currPost) {
    //   // let response = await dispatch(getOnePostThunk(postId))
    //   if (user?.id !== currPost?.user_id) {
    //     return history.push(`/posts/${postId}`)
    //   }
    //   setIsLoaded(true);
    // } else {

    // }

    // const controller = new AbortController();

    // console.log(currPost);
    // if (currPost) {
    //   dispatch(getOnePostThunk(postId)).then(() => setIsLoaded(true));
    //   setIsLoaded(true);
    //   console.log("if true", currPost);
    // } else {
    //   console.log("currPost is false", currPost);
    //   history.push(`/posts/${postId}`);
    //   return () => controller.abort();
    // }
  }, [dispatch]);

  // const handleCancel = async (e) => {
  //   e.preventDefault();
  //   history.push(`/posts/${postId}`);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = { caption };

    const data = await dispatch(editPostThunk(postId, form));

    if (data.errors) {
      // console.log("EDIT POST DATA HAS ERRORS \n\n", data.errors);
      // setErrors(data.errors);
    } else {
      history.push(`/posts/${postId}`);
    }
  };

  // console.log("is loaded!!!! ", isLoaded);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      // <div className="edit-post-page">
      //   <div className="postCard">
      //     <div className="left">
      //       <img className='post-picture' src={currPost.img_url}></img>
      //     </div>
      //     <div className="right">
      //     <div className="edit-post-inner">
      //       <form onSubmit={handleSubmit} className="editPostForm">
      //         <div>
      //           {errors.map((error, ind) => (
      //             <div id="errors" key={ind}>
      //               {error}
      //             </div>
      //           ))}
      //         </div>
      //         <label>
      //           Caption
      //           <textarea
      //             name="caption"
      //             onChange={(e) => setCaption(e.target.value)}
      //             value={caption}
      //           ></textarea>
      //         </label>
      //         <button className="editSubmitPostBtn">Share</button>
      //         <button className="editPostCancelBtn" onClick={handleCancel}>
      //           Cancel
      //         </button>
      //       </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="outerClass">
        <div className="inner">
          <form onSubmit={handleSubmit} autoComplete="off" className="createPostForm">
            <div className="topCreatePostModal">
              <p>Edit post</p>
              <div className="shareButtonDiv">
                <button className="shareButton">Share</button>
              </div>
            </div>
            <div className="lowerpartModal">
              <div className="leftEdit">
                <img className="post-picture" src={currPost.img_url} alt='post'></img>
              </div>
              <div className="rightEdit">
                <div className="rightCreate">
                  <div className="userInfoNewPost">
                    <img
                    alt="user"
                      className="userInfoNewPostImg"
                      src={user.profile_pic_url}
                    />
                    {user.username}
                  </div>

                  <label>
                    <textarea
                      name="caption"
                      onChange={(e) => setCaption(e.target.value)}
                      value={caption}
                      placeholder="Write your caption..."
                    ></textarea>
                  </label>
                </div>
                <div className="cancelEdit">
                  <div
                    onClick={() => history.push(`/posts/${currPost.id}`)}
                    className="cancelEditBtn"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
