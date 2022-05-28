import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const history = useHistory()

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);


  function toEdit(){
    history.push(`/users/${userId}/edit`)
  }


  if (!user) {
    return null;
  }

  //test

  // <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img>
  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <button onClick={e => toEdit()}>Edit Profile</button>
    </>
  );
}
export default User;
