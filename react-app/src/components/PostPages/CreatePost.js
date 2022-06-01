import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/post";
import * as sessionActions from "../../store/session";
import "./modals.css";

const CreatePost = ({ hideModal, changePostIcon }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [imgUrl, setImgUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);

  const closeModal = () => {
    // setShowModal(false);
    hideModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url, caption };
    console.log("IMG AND CAPTION", img_url, caption);
    const post = await dispatch(createPostThunk(user.id, form));
    hideModal()
    changePostIcon()
    console.log(post);
    // if (data.errors) {
    //   setErrors(data.errors);
    // } else {
    //   // await dispatch(getAllUsersThunk());
    //   // await dispatch(getUserThunk(userId));
    // }
    history.push(`/posts/${post.id}`);
  };

  return (
    <div>
      <div className="createPostModal">
        <div className="outer">
          <h1 onClick={closeModal}>X</h1>
        </div>
        <div className="inner">
          <form onSubmit={handleSubmit} className="createPostForm">
            <label>
              Photo
              <input
                type="text"
                name="img_url"
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              ></input>
            </label>
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
      </div>
    </div>
  );
};

export default CreatePost;
