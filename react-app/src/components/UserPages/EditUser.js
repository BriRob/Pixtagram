import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserThunk,
  getAllUsersThunk,
  getUserThunk,
  deleteUserThunk,
} from "../../store/user";
import "./EditUser.css";
import { authenticate, login, logout } from "../../store/session";

function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  // const users = useSelector((state) => state.userReducer.users);
  const { userId } = useParams();

  const [fullName, setFullName] = useState(currentUser?.full_name);
  const [biography, setBiography] = useState(currentUser?.bio);
  const [profilePicUrl, setProfilePicUrl] = useState(
    currentUser?.profile_pic_url
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState(currentUser?.username);
  const [errors, setErrors] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const setFunc = (currentUser) => {
    setBiography(currentUser?.bio);
    setProfilePicUrl();
    setFullName(currentUser?.full_name);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (currentUser) {
      dispatch(getUserThunk(userId))
        .then(() => dispatch(authenticate()))
        // .then(() => setFunc())
        .then(() => setIsLoaded(true));
    } else {
      history.push(`/users/${userId}`);
      return () => controller.abort();
    }

    // if (!currentUser) {
    //   history.push(`/users/${userId}`);
    // }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const full_name = fullName;
    const bio = biography;
    const profile_pic_url = profilePicUrl;
    const form = { full_name, bio, profile_pic_url };

    const data = await dispatch(editUserThunk(userId, form));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      await dispatch(getAllUsersThunk());
      await dispatch(getUserThunk(userId));
      await dispatch(authenticate());
      history.push(`/users/${userId}`);
    }
  };

  console.log("errors", errors);

  function backToProfile(e) {
    e.preventDefault();
    history.push(`/users/${userId}`);
  }

  async function deleteUser(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteUserThunk(userId));
    dispatch(logout());
    return history.push("/");
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setProfilePicUrl(file);
  };
  // {/* <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img> */}

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="edit-user-page">
        <div className="edit-user-form">
          {/* <img src={profilePicUrl}></img> */}
          <div>{userName}</div>
          <form onSubmit={handleSubmit} className="editUserActualForm">
            <div>
              {errors.map((error, ind) => (
                <div id="errors" key={ind}>
                  {error}
                </div>
              ))}
            </div>
            {/* <label>
              Username
              <div>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  disabled={true}
                  readOnly
                ></input>
              </div>
            </label> */}
            <div>
              <label>Name</label>
              {/* <div> */}
              <input
                className="editUserInput"
                type="text"
                name="full_name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              ></input>
              {/* </div> */}
            </div>

            <div>
              <label>Bio</label>
              {/* <div> */}
              <input
                className="editUserInput"
                type="text"
                name="biography"
                onChange={(e) => setBiography(e.target.value)}
                value={biography}
              ></input>
              {/* </div> */}
            </div>
            <div>
              <label htmlFor="editProfileUpload" className="custom-file-upload">
                Edit Profile Picture
                <input
                  type="file"
                  id="editProfileUpload"
                  name="profile_pic_url"
                  onChange={updateImage}
                  // onChange={(e) => setProfilePicUrl(e.target.value)}
                  accept="image/*"
                ></input>
              </label>
            </div>
            <button className="editSubmitBtn" type="submit">
              Submit
            </button>
            <button className="editCancelBtn" onClick={(e) => backToProfile(e)}>
              Cancel
            </button>
          </form>
          {/* <button onClick={e => deleteUser(e)}>Delete Account</button> */}
          <button className="delAccBtn" onClick={(e) => deleteUser(e)}>
            Delete Account
          </button>
        </div>
      </div>
    );
  }
}
export default EditUser;
