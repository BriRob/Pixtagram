import React, { useState, useEffect, Profiler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserThunk } from '../../store/user';
import './Profile.css'

function User() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state)=> state.session.user)
  const user = useSelector((state)=> state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const { userId } = useParams();

  console.log('USERID --->', userId)
  console.log("This is ueser from profile.js", user)
  console.log('This is USER ID', user?.id)

  useEffect(() => {
    if (sessionUser){
    dispatch(getUserThunk(userId))
    .then(()=> setIsLoaded(true))
    }
  }, [dispatch]);


  function toEdit(){
    history.push(`/users/${userId}/edit`)
  }


  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  // <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img>
  return (
    <>
    <div id="profile-container">

      <div id='header-container'>
        <div className='profile-pic'>
          <img id='profile-pic-left' src={user.profile_pic_url} alt='profile-picture'></img>
        </div>

        <div id='user-info-block'>
                <strong>{user?.username}</strong>
                {sessionUser.id == userId? <button onClick={e => toEdit()}>Edit Profile</button>: null}
            <div className='posts-followers'>
              <span>83 posts</span>
              <span>381 followers</span>
              <span>342 following</span>
            </div>
            <div id='biography'>
                <p>Bio</p> {user?.bio}

            </div>

                <p>{user?.full_name}</p>

        </div>
      </div>


      </div>
    </>
  );
}
export default User;
