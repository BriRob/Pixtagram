import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePostThunk } from "../../store/post";
import "./post.css";
function PostModal({ postId, show }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state?.posts?.post);
  const [delModal, setDelModal] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(show);

  const userId = post?.user_id;

  const openDelModal = (e) => {
    setDelModal(true);
  };

  const deletePost = async (e) => {
    await dispatch(deletePostThunk(postId));
    history.push(`/`);
  };

  return (
    <>
      {delModal && (
        <div className="editPostModal">
          <div className="deletePostConfirmText">
            <h3>Delete post</h3>
            <p className="confirmdeltext">Are you sure you want to delete this post?</p>
          </div>
          <div className="delPostBtnFinal" onClick={deletePost}>
            Delete
          </div>
          {/* <div className="cancelPostButton" onClick={(e) => setDelModal(false)}>
            Cancel
          </div> */}
        </div>
      )}
      {!delModal && (
        <div className="editPostModal">
          <div className="delPostBtn" onClick={openDelModal}>
            Delete
          </div>
          <div
            onClick={() => history.push(`/posts/${postId}/edit`)}
            className="editPostButton"
          >
            Edit
          </div>
        </div>
      )}
    </>
  );
}

export default PostModal;
