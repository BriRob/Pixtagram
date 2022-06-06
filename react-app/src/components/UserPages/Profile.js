import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";

import { getAllPostsThunk } from "../../store/post";
import { getUserThunk } from "../../store/user";
import LoadingSpinner from "../Spinner/Spinner";
import "./Profile.css";
import { postGridIcon } from "./profileIcons";
import CheckMark from "../CheckMark/CheckMark";

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state?.userReducer?.user);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();
  const verified = user?.verified;
  function postCounter(posts) {
    let count = 0;
    posts?.forEach((post) => {
      if (post.user_id == userId) {
        count += 1;
      }
    });
    return count;
  }

  function userPostsFinder(posts) {
    let arr = [];
    posts?.forEach((post) => {
      if (post.user_id == userId) {
        arr.push(post);
      }
    });
    return arr;
  }


  const count = postCounter(posts);
  const userPosts = userPostsFinder(posts);

  useEffect(async () => {
    if (sessionUser) {
      let response = await dispatch(getUserThunk(userId))

      if (response.id === undefined) {
        history.push("/page-not-found");
      } else {
        dispatch(getAllPostsThunk()).then(() => setIsLoaded(true));
      }

      // // .then(() => {
      //     if (pathname !== `/users/${userId}`) {
      //       // history.push("/page-not-found");
      //     }

      // }
      // if(user === undefined){
      //   history.push('/page-not-found')
    }
  }, [location]);

  function toEdit() {
    history.push(`/users/${userId}/edit`);
  }

  if (!isLoaded) {
    return (
      <>
        <div style={{ position: "relative", top: "400px", left: "50%" }}>
          <LoadingSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <div id="profile-container">
        <div id="header-container">
          <div className="profile-pic">
            <div id="profile-pic-border">
              <img
                id="profile-pic-left"
                src={user?.profile_pic_url}
                alt="profile-picture"
              ></img>
            </div>
          </div>

          <div id="user-info-block">
            <div id="username-and-edit-button">
              <p id="username-font">
                {`${user?.username}`}
                {verified ? <CheckMark /> : null}
              </p>
              {sessionUser.id == userId ? (
                <button id="profile-edit-button" onClick={(e) => toEdit()}>
                  Edit Profile
                </button>
              ) : null}
            </div>

            <div className="posts-followers">
              <span className="p-f">{`${count} Posts`}</span>
              <span className="p-f">381 followers</span>
              <span className="p-f">342 following</span>
            </div>
            <div id="user-full-name">{`${user?.full_name}`}</div>
            <div id="biography">
              <span>{user?.bio}</span>
            </div>
          </div>
        </div>
        <div id="profile-nav-bar">
          <div id="gallery-line"></div>
          <div className="postsIconLabel">
            <div id="postGridIcon">{postGridIcon}</div>
            <div id="user-profile-nav-bar">Posts</div>
          </div>
        </div>

        <div id="gallery">
          <div className="profile-posts">
            {userPosts?.map((post) => (
              <div key={post.id} className="post">
                <NavLink to={`/posts/${post.id}`}>
                  <img className="one-post" src={`${post?.img_url}`}></img>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
