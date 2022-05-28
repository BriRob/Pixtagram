import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../store/user";



function EditUser() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session);
  // console.log(currentUser);
  const history = useHistory()

  const displayUserName = currentUser.user.username
  const userBio = currentUser.user.bio
  const userFullName = currentUser.user.full_name


  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState(userFullName);
  const [biography, setBiography] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [userName, setUserName] = useState(displayUserName);
  const { userId } = useParams();

  //   useEffect(() => {
  //     if (!userId) {
  //       return;
  //     }
  //     (async () => {
  //       const response = await fetch(`/api/users/${userId}/edit`);
  //       const user = await response.json();
  //       setUser(user);
  //     })();
  //   }, [userId]);

  //   if (!user) {
  //     return null;
  //   }

  // const response = await fetch(`/api/users/${userId}/edit`);
  // const user = await response.json();
  // setUser(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const full_name = fullName
    const bio = biography
    const profile_pic_url = profilePicUrl
    const form = { full_name, bio, profile_pic_url }
    console.log("FORM", form)
    dispatch(editUserThunk(userId, form))
    history.push(`/users/${userId}`)
  }

  function backToProfile(){
    history.push(`/users/${userId}`)
  }

  // {/* <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img> */}

  return (
    <>
      <form onSubmit={handleSubmit}>
          <label>Username
            <div>
              <input
                type='text'
                name='userName'
                value={userName}
                disabled={true}
              ></input>
            </div>
          </label>
          <label>Fullname
            <div>
              <input
                type='text'
                name='full_name'
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              ></input>
            </div>
          </label>
          <label>Bio
            <div>
              <input
                type='text'
                name='biography'
                onChange={(e) => setBiography(e.target.value)}
                value={biography}
              ></input>
            </div>
          </label>
          <label>Edit Profile Pic
            <div>
              <input
                type='text'
                name='profile_pic'
                onChange={e => setProfilePicUrl(e.target.value)}
              ></input>
            </div>
          </label>
        <button type="submit">Submit</button>
        <button onClick={e => backToProfile()}>Cancel</button>
        </form>
    </>
  );
}
export default EditUser;
