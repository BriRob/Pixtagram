import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, getCommentsThunk, getOneCommentThunk } from "../../store/comment";
import LoadingSpinner from "../Spinner/Spinner";
import { deleteCommentThunk } from "../../store/comment";
import checkmark from '../CheckMark/checkmark.png'
import { closeButton } from "../NavBar/Navicons";
import { NavLink, useHistory } from "react-router-dom";

import './SplashComments.css';

function SplashComments({ postId }) {
    // console.log('You need this post id \n\n', postId)
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector((state) => state?.comments?.comments_list);
    // console.log('Need one comment please', comments)

    // console.log('WHat is in comments?\n\n', comments)
    // const currUser = useSelector((state) => state?.session?.user?.id)
    const currUser = useSelector((state) => state?.session?.user?.id);
    // // console.log("Maica USER ID", currUser);
    // const currPost = useSelector((state) => state?.posts?.post?.id)

    const [text, setText] = useState("");
    const [errors, setErrors] = useState([]);
    const [showMore, setShowMore] = useState(false)

    // need to grab comment text somehow
    // const textC = comments[0]?.text

    // console.log('Help \n\n',comments.comment)

    //will delete the comment if it belongs to the user - need to find a way to get current comment it
    // const deleteComment = async (e, commentId) => {
    //     console.log("What is the thunk getting?", commentId)
    //     await dispatch(deleteCommentThunk(commentId)).then(() => dispatch(getCommentsThunk(postId)))
    //   }

      //will post a comment
      const handleSubmit = async (e) => {
        e.preventDefault();
        // const postId = currPost;
        // console.log('CURRPOST -MS \n\n', postId)
        const userId = currUser;
        // console.log('USERID -MS \n\n', userId)
        const form = { text };
        const comment = await dispatch(createCommentThunk(userId, postId, form))
          // .then(() => getOneCommentThunk(commentId))
        setText('')
        if (comment.errors) {
          setErrors(comment.errors);
        } else {
          await dispatch(getCommentsThunk(postId));
        }
      };

      useEffect(async () => {
        await dispatch(getCommentsThunk(postId))
            // .then(() => dispatch(getOneCommentThunk()))
      }, [dispatch]);

    //   console.log("Hello from splash compo\n\n", comments)

      return (
          <>
            { comments && (
                <>
                    <div id='s-parent'>
                        <div id='s-comment-container'>
                                    {/* <div id='s-pic-container'>
                                        <img id='s-pic' src={comments[0].user.profile_pic_url}/>
                                    </div> */}
                            <div>
                              <p id='s-username'>{comments[0]?.user?.username}</p>
                            </div>
                            <div id='s-com-div'>
                              <p id='s-comment'>{comments[0]?.text}</p>
                            </div>
                        </div>
                        <div>
                      {/* {currUser == comment.user.id && (
                        <div
                          className='delete'
                          onClick={(e) => deleteComment(e, comment[0]?.id)}
                        >{closeButton}</div>)} */}
                        </div>
                        <div id='s-nav'>
                           <NavLink id='navlink' to={`/posts/${postId}`}>View all {comments?.length} comments</NavLink>
                        </div>
                        <div id='s-line'></div>
                        <div id='s-comment-form'>
                            <form
                                id='splash-comment-form'
                                onSubmit={handleSubmit}
                            >
                                <input
                                    placeholder="Add a comment.."
                                    onChange={(e) => setText(e.target.value)}
                                    type='text'
                                    name='text'
                                    value={text}
                                ></input>
                                <button
                                    id='post-button'
                                    disabled={!text}
                                >Post</button>
                            </form>

                        </div>
                    </div>
                </>

            )}
          </>
      )
}

export default SplashComments
