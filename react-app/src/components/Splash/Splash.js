import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import "./Splash.css";
import { getUserThunk } from "../../store/user";
import { dotDotDotIcon } from "./SplashIcons";
import { getAllPostsThunk } from "../../store/post";
import LoadingSpinner from "../Spinner/Spinner";
import { NavLink } from "react-router-dom";
import CheckMark from "../CheckMark/CheckMark";
import checkmark from '../CheckMark/checkmark.png'
import { getCommentsThunk } from "../../store/comment";
import SplashComments from "./SplashComments";



function Splash() {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector((state) => state.session.user.id);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);
  //   console.log(posts);

  useEffect(() => {
    dispatch(getUserThunk(id))
    .then(() => dispatch(getAllPostsThunk()))
    // .then(() => dispatch(getCommentsThunk()))
  }, [dispatch]);

  const sendToProfile = (e, id) => {
    e.stopPropagation();
    console.log("wtf");
    history.push(`/users/${id}`);
  };

  if (!id) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {/* <div className="home-page-body"> */}
        <div className="stories-container"></div>
        <div className="feed">
          {posts ? (
            posts?.map((post, idx) => (
              <div key={idx}>
                <div className="post-card-feed">
                  <div className="user-profile-info-feed">
                    <div className="user-profile-info">
                      <NavLink to={`/users/${post.user.id}`}>
                        <img
                          src={post.user.profile_pic_url}
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "50px",
                          }}
                          className="user-profile-pic-feed"
                        ></img>
                      </NavLink>
                      <NavLink
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                        to={`/users/${post.user.id}`}
                      >
                        {post.user.username}
                        {post.user.verified?<img style={{'height': '15px'}}
                        src={checkmark}></img>:null}
                      </NavLink>
                    </div>
                    {id == post.user.id && <div className="dotdotdot">{dotDotDotIcon}</div>}
                  </div>
                  <div className="feed-post-image">
                    <NavLink
                      style={{ color: "white", fontWeight: "bold" }}
                      to={`/posts/${post.id}`}
                    >
                      <img className="user-post-image" src={post.img_url}></img>
                    </NavLink>
                  </div>
                  <div className="bottom-post-feed">
                    <div className="likes-post-feed">
                      <p>Here go the likes</p>
                    </div>
                    <div className="opinionsBox">
                      <div className="post-caption-feed">
                        {/* <img
                          src={post.user.profile_pic_url}
                          className="user-profile-pic-caption"
                        ></img> */}
                        <NavLink
                          id='id-nav'
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            textDecoration: "none",
                            marginRight: "15px",
                          }}
                          to={`/users/${post.user.id}`}
                        >
                          {post.user.username}{post.user.verified? <img style={{'height':'15px'}} src={checkmark}/>: null}
                        </NavLink>
                        {post.caption}
                      </div>

                      <div id='splash-comment-container'>
                        <SplashComments post={post}/>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {/* <button onClick={(e) => goToProfile(e)}>Go to profile</button> */}
      {/* </div> */}
    </>
  );
}

export default Splash;
