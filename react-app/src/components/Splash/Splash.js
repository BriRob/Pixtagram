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
function Splash() {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector((state) => state.session.user.id);
  const posts = useSelector((state) => state?.posts?.allPosts?.posts);
//   console.log(posts);

  useEffect(() => {
    dispatch(getUserThunk(id)).then(() => dispatch(getAllPostsThunk()));
  }, [dispatch]);

  // function goToProfile(){
  //     history.push(`/users/${id}`)
  // }

  const sendToProfile = (e, id) => {
      e.stopPropagation()
      console.log('wtf')
      history.push(`/users/${id}`)
  }

  if (!id) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="home-page-body">
        <div className="stories-container"></div>
        <div className="feed">
          {posts ? (
            posts?.map((post, idx) => (
              <div key={idx}>
                <div className="post-card">
                  <div className="user-profile-info">
                    <img
                      src={post.user.profile_pic_url}
                      style={{
                        'height': "40px",
                        'width': "40px",
                        "borderRadius": "50px",
                      }}
                    ></img>
                    <div className="picture-info">
                        <NavLink style={{ color: "white", fontWeight: "bold" }} to={`/users/${post.user.id}`}>{post.user.username}</NavLink>
                        <NavLink style={{ color: "white", fontWeight: "bold" }} to={`/posts/${post.id}`}>Go to post</NavLink>
                    </div>
                    <div className="dotdotdot">{dotDotDotIcon}</div>
                  </div>
                  <img className="user-post" src={post.img_url}></img>
                  <div className="opinionsBox">
                        {post.caption}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {/* <button onClick={(e) => goToProfile(e)}>Go to profile</button> */}
      </div>
    </>
  );
}

export default Splash;
