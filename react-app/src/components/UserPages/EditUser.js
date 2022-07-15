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
import { authenticate, logout } from "../../store/session";

function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  // const users = useSelector((state) => state.userReducer.users);
  const { userId } = useParams();

  const [fullName, setFullName] = useState(sessionUser?.full_name);
  const [biography, setBiography] = useState(sessionUser?.bio);
  const [profilePicUrl, setProfilePicUrl] = useState(
    sessionUser?.profile_pic_url
  );
  const [isLoaded, setIsLoaded] = useState(false);
  // const [userName, setUserName] = useState(sessionUser?.username);

  const [errors, setErrors] = useState([]);
  const [preImg, setPreImg] = useState(sessionUser?.profile_pic_url);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [demoUser, setDemoUser] = useState(false);

  // const setFunc = (currentUser) => {
  //   setBiography(currentUser?.bio);
  //   setProfilePicUrl();
  //   setFullName(currentUser?.full_name);
  // };

  // console.log("******************CURRSUSER", currentUser);

  useEffect(() => {
    // const controller = new AbortController();

    dispatch(getUserThunk(userId));

    if (currentUser) {
      setIsLoaded(true);
    }
    if (sessionUser.id === 1) {
      setDemoUser(true);
    }
    // if (currentUser?.id == sessionUser?.id) {
    //   // dispatch(getUserThunk(userId))
    //   //   .then(() => dispatch(authenticate()))
    //   //   // .then(() => setFunc())
    //   //   .then(() => setIsLoaded(true));
    //   setIsLoaded(true);
    // } else {
    //   history.push(`/users/${userId}`);
    //   return () => controller.abort();
    // }

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

  function backToProfile(e) {
    e.preventDefault();
    history.push(`/users/${userId}`);
  }

  async function deleteUser(e) {
    e.preventDefault();
    e.stopPropagation();
    if (sessionUser.id === 1) {
      window.alert("You can't delete the Demo User.");
    } else {
      dispatch(deleteUserThunk(userId));
      dispatch(logout());
      return history.push("/");
    }
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreImg(reader.result);
    };
    setProfilePicUrl(file);
  };
  // {/* <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img> */}

  if (!isLoaded && currentUser === undefined) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        {showPostOptions && (
          <>
            {demoUser && (
            <>
              <div className="background">
                <div className="postOptionsModal">
                  <div
                    onClick={() => setShowPostOptions(false)}
                    className="postOptionsModalBckg"
                  ></div>
                  <div className="actualModalComponent">
                    <div className="editPostModal">
                      <div className="deletePostConfirmText">
                        <h3>Delete user</h3>
                        <p className="confirmdeltext">
                          You cannot delete the Demo User.
                        </p>
                      </div>
                      {/* <div className="cancelPostButton" onClick={(e) => setDelModal(false)}>
            Cancel
          </div> */}
                    </div>
                    <div
                      className="cancelPostButtonDemo"
                      onClick={() => setShowPostOptions(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </>)}
            {!demoUser && (
              <div className="background">
                <div className="postOptionsModal">
                  <div
                    onClick={() => setShowPostOptions(false)}
                    className="postOptionsModalBckg"
                  ></div>
                  <div className="actualModalComponent">
                    <div className="editPostModal">
                      <div className="deletePostConfirmText">
                        <h3>Delete user</h3>
                        <p className="confirmdeltext">
                          Are you sure you want to delete your user?
                        </p>
                      </div>
                      <div
                        className="delPostBtnFinal"
                        onClick={(e) => deleteUser(e)}
                      >
                        Delete
                      </div>
                      {/* <div className="cancelPostButton" onClick={(e) => setDelModal(false)}>
            Cancel
          </div> */}
                    </div>
                    <div
                      className="cancelPostButton"
                      onClick={() => setShowPostOptions(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="bigEditUserPage">
          <div className="edit-user-page">
            <div className="leftEditUser">
              <div className="editUserLeftText">
                <p>Edit User</p>
              </div>
            </div>
            <div className="edit-user-form">
              {/* <img src={profilePicUrl}></img> */}
              <div className="top-edit">
                <div className="top-edit-part">
                  <img alt="user" className="user-pic-edit" src={preImg} />
                  <div>
                    {sessionUser?.username}
                    <div>
                      <label
                        htmlFor="editProfileUpload"
                        className="editProfileUpload"
                      >
                        Change Profile Picture
                        <input
                          type="file"
                          id="editProfileUpload"
                          name="profile_pic_url"
                          onChange={updateImage}
                          // onChange={(e) => setProfilePicUrl(e.target.value)}
                          accept=".jpg, .jpeg, .png, .gif"
                        ></input>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="editUserActualForm">
                <div>
                  {errors.map((error, ind) => (
                    <div id="errors" key={ind}>
                      {error}
                    </div>
                  ))}
                </div>

                <div className="editUserInputs">
                  <label className="editLabels">Name</label>
                  <div className="editUserInputContainer">
                    <input
                      className="editUserInput"
                      type="textarea"
                      name="full_name"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    ></input>
                    <div>
                      <p className="maxCharacters">Maxixum 50 characters</p>
                    </div>
                  </div>
                </div>

                <div className="editUserInputs">
                  <label className="editLabels">Bio</label>
                  <div className="editUserInputContainer">
                    <textarea
                      className="editUserInputBio"
                      type="text"
                      name="biography"
                      onChange={(e) => setBiography(e.target.value)}
                      value={biography}
                    ></textarea>
                    <div>
                      <p className="maxCharacters">Maximum 150 characters</p>
                    </div>
                  </div>
                </div>
                <div className="buttonContainer">
                  <button
                    className="editSubmitBtn"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                  <button
                    className="editCancelBtn"
                    onClick={(e) => backToProfile(e)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <button
              className="delAccBtn"
              onClick={(e) => setShowPostOptions(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default EditUser;
