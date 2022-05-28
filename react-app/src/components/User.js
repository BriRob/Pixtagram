import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserThunk } from '../store/user';

function User() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state)=> state.session.user)
  const user = useSelector((state)=> state.userReducer.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const { userId } = useParams();

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
      <ul>
        <li>
          <strong>{user.full_name}</strong> 
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        <li>
          <strong>Bio</strong> {user.bio}
        </li>
      </ul>
      {sessionUser.id == userId? <button onClick={e => toEdit()}>Edit Profile</button>: null}
    </>
  );
}
export default User;
