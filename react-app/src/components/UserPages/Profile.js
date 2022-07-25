import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";

import { getAllPostsThunk } from "../../store/post";
import {
  createFollow,
  deleteFollow,
  getFollowersThunk,
  getUserThunk,
} from "../../store/user";
import LoadingSpinner from "../Spinner/Spinner";
import "./Profile.css";
import { postGridIcon } from "./profileIcons";
import CheckMark from "../CheckMark/CheckMark";
import Followers from "../Follows/Followers";
import Following from "../Follows/Following";

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state?.userReducer?.user);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);


  const followersObj = useSelector((state) => state?.userReducer.userFollowers);
  console.log("Show me Followers Obj", followersObj);


  let followers;

  if (followersObj) {
    followers = Object.values(followersObj);
    // console.log("What are followers? \n\n", followers)
  }

  // const followers = Object.values(followersObj);

  // let bats = followers?.filter(follower => follower.id === 11)
  // console.log("show me",bats)

  console.log("Followers Array from obj \n\n", followers);
  console.log(
    "WILL THIS BE TRUE followers \n\n",
    followers?.filter((follower) => follower.id === sessionUser.id).length === 0
  );

  const { userId } = useParams();
  const verified = user?.verified;

  // console.log("user followers!!! \n\n", user.followers.length)
  // console.log("user following!!! \n\n", user.following.length)

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

  const followFunc = async (sessionUserId, followingUserId) => {
    await dispatch(createFollow(sessionUserId, followingUserId));
    await dispatch(getFollowersThunk(followingUserId));
    await dispatch(getUserThunk(followingUserId));
  };


  const unfollowFunc = async (sessionUserId, followingUserId) => {
    await dispatch(deleteFollow(sessionUserId, followingUserId));
    await dispatch(getFollowersThunk(followingUserId));
    await dispatch(getUserThunk(followingUserId));
  };

  const usersFollowers = async (userId) => {
    // await dispatch(getFollowersThunk(userId));
    setShowFollowers(true);
  };

  useEffect(async () => {
    if (sessionUser) {
      let response = await dispatch(getUserThunk(userId));

      if (response.id === undefined) {
        history.push("/page-not-found");
      } else {
        dispatch(getAllPostsThunk()).then(() => setIsLoaded(true));
      }

      (async () => {
        // let someFollowers = await dispatch(getFollowersThunk(userId));
        await dispatch(getFollowersThunk(userId));
        // console.log("Followers from useEffect \n\n", someFollowers);
      })();

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

              {/* Follow Button */}

              {user.id !== sessionUser.id &&
                followers?.filter((follower) => follower.id === sessionUser.id)
                  .length === 0 && (
                  <>
                    <div className="follow-button-div">
                      <button
                        onClick={() => followFunc(sessionUser.id, userId)}
                        id="follow-button"
                        className="follow-button"
                      >
                        Follow
                      </button>
                    </div>
                  </>
                )}

              {/* Unfollow Button */}

              {followers?.filter((follower) => follower.id === sessionUser?.id)
                .length > 0 && (
                // console.log(follower)
                <>
                  <div className="follow-button-div">
                    <button
                      onClick={() => unfollowFunc(sessionUser?.id, userId)}
                      className="follow-button"
                    >
                      Unfollow
                    </button>
                  </div>
                </>
              )}
            </div>

            {showFollowers && (
              <div className="backgroundFeed">
                <div className="postOptionsModalFeed">
                  <div
                    onClick={() => setShowFollowers(false)}
                    className="postOptionsModalBckgFeed"
                  ></div>
                  <div className="bothFollowsBigDiv actualModalComponentFeed ">
                    <Followers
                      userId={userId}
                      hideFollowers={() => setShowFollowers(false)}
                    />
                    {/* <LikesModal views={postForViewLikes} show={showLikes} /> */}
                    <div
                      className="closeLikesModal"
                      onClick={() => setShowFollowers(false)}
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showFollowing && (
              <div className="backgroundFeed">
                <div className="postOptionsModalFeed">
                  <div
                    onClick={() => setShowFollowing(false)}
                    className="postOptionsModalBckgFeed"
                  ></div>
                  <div className="bothFollowsBigDiv actualModalComponentFeed">
                    <Following
                      userId={userId}
                      hideFollowing={() => setShowFollowing(false)}
                    />
                    {/* <LikesModal views={postForViewLikes} show={showLikes} /> */}
                    <div
                      className="closeLikesModal"
                      onClick={() => setShowFollowing(false)}
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="posts-followers">
              <span className="p-f">{`${count} Posts`}</span>
              {/* <span className="p-f">381 followers</span> */}
              {/* <span onClick={() => setShowFollowers(true)} className="p-f"> */}
              {followers?.length === 1 ? (
                <span onClick={() => usersFollowers(userId)} className="p-f">
                  1 follower
                </span>
              ) : (
                <span onClick={() => usersFollowers(userId)} className="p-f">
                  {user.followers?.length} followers
                </span>
              )}
              {/* <span onClick={() => usersFollowers(userId)} className="p-f">
                {user.followers?.length} followers
              </span> */}
              <span onClick={() => setShowFollowing(true)} className="p-f">
                {user.following?.length} following
              </span>
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
