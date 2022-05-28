import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../store/user";



function EditUser() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session);
  // console.log(currentUser);
  const history = useHistory()

  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState();
  const [bio, setBio] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { fullName, bio, profilePicUrl }
    const updated_info = await dispatch(editUserThunk(userId, form))
  }

  function backToProfile(){
    history.push(`/users/${userId}`)
  }

  // {/* <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img> */}

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Fullname</label>
        <input
          type='text'
          name='full_name'
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        ></input>
        <label>Bio</label>
        <input
          type='text'
          name='bio'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        ></input>
        <label>Edit Profile Pic</label>
      </form>
      <button onClick={e => backToProfile()}>Cancel</button>
    </>
  );
}
export default EditUser;
