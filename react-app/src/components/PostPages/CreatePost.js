import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/post";
import * as sessionActions from "../../store/session";
import { closeButton, postImageModalIcon } from "../NavBar/Navicons";
import "./modals.css";

const CreatePost = ({ hideModal, changePostIcon }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [imgUrl, setImgUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);
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
    const img_url = imgUrl;
    const form = { img_url, caption };
    const post = await dispatch(createPostThunk(user.id, form));

    if (post.errors) {
      setErrors(post.errors);
    } else {
      closeModal();
      window.location.reload();
      history.push("/");
    }
  };

  return (
    <div>
      <div className="createPostModal">
        <div className="inner">
          <div className="topCreatePostModal">
            <p>Create new post</p>
          </div>
          <form onSubmit={handleSubmit} className="createPostForm">
            <div className="left">
              {showUpload && (
                <>
                  {postImageModalIcon}
                  Upload photos here
                  <label for="file-upload" className="custom-file-upload">
                    Select From Computer
                    <input
                      id="file-upload"
                      type="file"
                      name="img_url"
                      onChange={updateImage}
                      accept="image/*"
                    ></input>
                  </label>
                </>
              )}
              {!showUpload && (
                <img src={previewUrl} className="previewImage"></img>
              )}
            </div>
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
            <button>Share</button>
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
