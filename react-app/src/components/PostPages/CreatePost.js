import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createPostThunk } from "../../store/post";
// import * as sessionActions from "../../store/session";
import { closeButton, postImageModalIcon } from "../NavBar/Navicons";
import "./modals.css";

const CreatePost = ({ hideModal, changePostIcon }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = useSelector((state) => state.session.user);
  const [imgUrl, setImgUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);
  const [share, setShare] = useState(true);
  const [sharing, setSharing] = useState(false);

  const [showUpload, setShowUpload] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  const closeModal = () => {
    hideModal();
    changePostIcon();
  };

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreviewUrl(reader.result);
    };
    setImgUrl(file);
    setShowUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShare(false);
    setSharing(true);
    const img_url = imgUrl;
    const form = { img_url, caption };
    const post = await dispatch(createPostThunk(user.id, form));

    if (post.errors) {
      // console.log("CREATE POST HAS ERRORS", post.errors)
      setErrors(post.errors);
      setSharing(false)
      setShare(true)
    } else {
      closeModal();
      if (pathname === "/") {
        window.location.reload();
      } else {
        history.push("/");
      }
    }

    return post;
  };

  // console.log("Errors from CREATE POST \n\n", errors)

  return (
    <div>
      <div className="createPostModal">
        <div className="createPostBckg" onClick={() => closeModal()}></div>
        <div className="inner">
          <form onSubmit={handleSubmit} autoComplete="off" className="createPostForm">
            <div className="topCreatePostModal">
              <p>Create new post</p>
              <div className="shareButtonDiv">
                {share && <button className="shareButton">Share</button>}
                {sharing && <div className="sharingButton">Sharing...</div>}
              </div>
            </div>
            <div className="lowerpartModal">
              <div className="left">
                {showUpload && (
                  <>
                    {postImageModalIcon}
                    Upload photos here
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select From Computer
                      <input
                        id="file-upload"
                        type="file"
                        name="img_url"
                        onChange={updateImage}
                        accept=".jpg, .jpeg, .png, .gif"
                      ></input>
                    </label>
                  </>
                )}
                {!showUpload && (

                  <img
                    src={previewUrl}
                    className="previewImage"
                    alt="preview"
                  ></img>

                )}
              </div>
              <div>
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
                <div className="createErrors">
                  {errors.map((error, ind) => (
                    <div id="errors" key={ind}>
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="outer">
          <h1 onClick={closeModal}>{closeButton}</h1>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
