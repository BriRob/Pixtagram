import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, getAllUsersThunk, getUserThunk } from "../../store/user";
import "./EditUser.css";

function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const currentUser = useSelector((state) => state.userReducer.user);
  const users = useSelector((state) => state.userReducer.users);
  const { userId } = useParams();

  const [fullName, setFullName] = useState(currentUser?.full_name);
  const [biography, setBiography] = useState(currentUser?.bio);
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState(currentUser?.username);
  const [errors, setErrors] = useState([]);

  const setFunc = (currentUser) => {
    setBiography(currentUser?.bio);
    setProfilePicUrl();
    setFullName(currentUser?.full_name);
  };

  useEffect(() => {
    dispatch(getUserThunk(userId))
      // .then(() => setFunc())
      .then(() => setIsLoaded(true))

      if(!currentUser){
        history.push(`/users/${userId}`)
      }
  }, [dispatch], currentUser);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const full_name = fullName;
    const bio = biography;
    const profile_pic_url = profilePicUrl;
    const form = { full_name, bio, profile_pic_url };
    console.log(form)
    const data = await dispatch(editUserThunk(userId, form));

    if (data.errors) {
      setErrors(data.errors)
      console.log("THERE ARE ERRORS", data.errors[0])
    } else {
      await dispatch(getAllUsersThunk())
      await dispatch(getUserThunk(userId))
      history.push(`/users/${userId}`);
    }
  };


  function backToProfile(e) {
    e.preventDefault();
    history.push(`/users/${userId}`);
  }

  // {/* <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img> */}

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  // console.log("ERRORS ARE SET--------", errors)
  return (
    <>
        {currentUser.full_name && (<form onSubmit={handleSubmit}>
              <div>
              {errors.map((error, ind) => (
                <div id='errors' key={ind}>{error}</div>
                ))}
              </div>
          <label>
            Username
            <div>
              <input
                type="text"
                name="userName"
                value={userName}
                disabled={true}
              ></input>
            </div>
          </label>
          <label>
            Fullname
            <div>
              <input
                type="text"
                name="full_name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              ></input>
            </div>
          </label>
          <label>
            Bio
            <div>
              <input
                type="text"
                name="biography"
                onChange={(e) => setBiography(e.target.value)}
                value={biography}
              ></input>
            </div>
          </label>
          <label>
            Edit Profile Pic
            <div>
              <input
                type="text"
                name="profile_pic"
                onChange={(e) => setProfilePicUrl(e.target.value)}
              ></input>
            </div>
          </label>
          <button type="submit">Submit</button>
          <button onClick={(e) => backToProfile(e)}>Cancel</button>

        </form>)}
    </>
  );
}
export default EditUser;
