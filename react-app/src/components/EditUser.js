import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk, getUserThunk } from "../store/user";



function EditUser() {

  const dispatch = useDispatch()
  const sessionUser = useSelector((state)=> state.session.user)
  const currentUser = useSelector(state => state.userReducer.user)
  const history = useHistory()

  // const displayUserName = currentUser.username
  // const userBio = currentUser.bio
  // const userFullName = currentUser.full_name

  const [fullName, setFullName] = useState(currentUser?.full_name);
  const [biography, setBiography] = useState(currentUser?.bio);
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
  const [userName, setUserName] = useState(currentUser?.username);
  const { userId } = useParams();

  
  
  useEffect(() => {
    const setFunc = () => {
      setBiography(currentUser?.bio)
      setProfilePicUrl()
      setFullName(currentUser?.full_name)
    }
    dispatch(getUserThunk(userId))
    .then(() => setFunc())
    .then(() => setIsLoaded(true))
  }, [dispatch]);


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
  
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

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
