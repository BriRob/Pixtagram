import React, { useState, useEffect, Profiler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getAllPostsThunk } from '../../store/post';
import { getUserThunk } from '../../store/user';
import LoadingSpinner from '../Spinner/Spinner';
import './Profile.css'
import { postGridIcon } from './profileIcons';

function User() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const user = useSelector((state) => state.userReducer.user)
  const posts = useSelector((state) => state?.posts?.allPosts?.posts)
  const [isLoaded, setIsLoaded] = useState(false)
  const { userId } = useParams();

  // console.log('USERID --->', userId)
  // console.log("This is ueser from profile.js", user)
  // console.log('This is USER ID', user?.id)
  // console.log(posts, "this is postsArr")

  function postCounter(posts) {
    let count = 0
    posts?.forEach(post => {
      if (post.user_id == userId) {
        count += 1;
      }
    })
    return count
  }

  function userPostsFinder(posts) {
    let arr = []
    posts?.forEach(post => {
      if (post.user_id == userId) {
        arr.push(post);
      }
    })
    return arr
  }

  const count = postCounter(posts)
  const userPosts = userPostsFinder(posts)

  useEffect(() => {
    console.log('RERENDERING -----------------------');
    if (sessionUser) {
      dispatch(getUserThunk(userId))
      dispatch(getAllPostsThunk())
        .then(() => setIsLoaded(true))
    }
  }, [dispatch]);


  function toEdit() {
    history.push(`/users/${userId}/edit`)
  }


  if (!isLoaded) {
    return (
      <>
        <div style={{ 'position': 'relative', 'top': '400px', 'left': '50%' }}>
          <LoadingSpinner />
        </div>
      </>
    )
  }

  // <img src='https://pixtagrambucket.s3.amazonaws.com/pixta_test.png'></img>
  return (
    <>
      <div id="profile-container">
        <div id='header-container'>
          <div className='profile-pic'>
            <img id='profile-pic-left' src={user?.profile_pic_url} alt='profile-picture'></img>
          </div>

          <div id='user-info-block'>

            <strong>{user?.username}</strong>
            {sessionUser.id == userId ? <button
              style={{
                'color': 'FAFAFA',
                'backgroundColor': '#121212',
                'border': '1px solid rgb(54,54,54)'
              }}
              onClick={e => toEdit()}>Edit Profile</button> : null}

            <div className='posts-followers'>
              <span>{`${count} Posts`}</span>
              <span>381 followers</span>
              <span>342 following</span>
            </div>
            <div id='user-full-name'>{`${user?.full_name}`}</div>
            <div id='biography'>
              <span>{user?.bio}</span>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center',
          fontSize: '30px', alignItems: 'center'
        }}
          id='profile-nav-bar'>
          {postGridIcon}
          <span
            style={{ padding: '5px' }}
            id='user-profile-nav-bar'>posts</span>
        </div>
        <div className='profile-posts'>
          {userPosts?.map(post =>
            <>
              <div>

                <NavLink to={`/posts/${post.id}`}>

                <img
                  style={{ 'height': '200px', 'width': '200px' }}
                  src={`${post?.img_url}`}>
                </img>

                    </NavLink>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default User;
