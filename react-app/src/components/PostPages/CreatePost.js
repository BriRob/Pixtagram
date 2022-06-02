import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory} from "react-router-dom";
import { createPostThunk } from "../../store/post";
import * as sessionActions from "../../store/session";
import "./modals.css";

const CreatePost = ({ hideModal, changePostIcon }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [imgUrl, setImgUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState([]);

  const closeModal = () => {
    hideModal();
    changePostIcon();
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img_url = imgUrl;
    const form = { img_url, caption };
    console.log("IMG AND CAPTION", img_url, caption);
    const post = await dispatch(createPostThunk(user.id, form));

    console.log("POST HERE \n\n", post);
    if (post.errors) {
      setErrors(post.errors);
    } else {
      closeModal()
      window.location.reload()
    }
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
                type="file"
                name="img_url"
                // onChange={(e) => setImgUrl(e.target.value)}
                onChange={updateImage}
                // value={imgUrl}
                accept="image/*"
                // required
              ></input>
            </label>
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
      </div>
    </div>
  );
};

export default CreatePost;
