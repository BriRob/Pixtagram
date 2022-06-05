import { useDispatch } from "react-redux";
import "./post.css";


function LikesModal({ views }) {
  const dispatch = useDispatch();
  // console.log(views.post_likes)
  const likesArr = Object.values(views.post_likes)

  return (
    <>
    <h2>Likes</h2>
    {likesArr.map((user, idx) => (
      <div key={idx}>

        <div>{user.username}</div>
        {/* <div>{user.full_name}</div> */}
      </div>
    ))}

    </>
  );
}

export default LikesModal;
