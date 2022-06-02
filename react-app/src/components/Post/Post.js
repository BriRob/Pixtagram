import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePostThunk } from "../../store/post"
import daysSincePost from "./helpers"
import { likeHeart, likeHeartFilledIn, commentIcon } from './postIcons'

function Post() {
    const dispatch = useDispatch()
    const post = useSelector((state) => state?.posts?.post)
    //DID YOU ENCOUNTER AN ERROR?! TRY NPM INSTALL MOMENT --SAVE

    const [likeStatus, setLikeStatus] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const { postId } = useParams()
    const [date, setDate] = useState('')
    useEffect(() => {
        dispatch(getOnePostThunk(postId))
        .then(()=>setIsLoaded(true))
    }, [isLoaded])

    // if(isLoaded){
    //     const response = daysSincePost(post)
    //     setDate(response)
    // }


    function changeHeart(e) {
        e.preventDefault();
        e.stopPropagation();
        likeStatus === false ? setLikeStatus(true) : setLikeStatus(false);
    }
    // console.log(date)

    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {

        return (
            <>
                <div>
                    <img className='post-picture' src={post?.img_url}></img>
                </div>
                <div className="user-info">
                    <span className="user-name">{post?.user.username}</span>
                </div>
                <div>
                    <p className="caption">{post?.caption}</p>
                    <span>{`Posted ${date}`}</span>
                </div>
                <div className="post-icons">
                    <div style={{ 'cursor': 'pointer' }}
                        onClick={e => changeHeart(e)}>{likeStatus === false ? likeHeart : likeHeartFilledIn}
                    </div>
                    <div
                        // onClick={(e) => console.log(e.target, "e.target", e.relatedTarget.addEventListener('text-area-box'), "e.related")}
                        className="comment-icon-post">{commentIcon}</div>

                </div>
                <div className="liked-by">
                    <span className="liked-by-line">{`Liked by Demo and 45 others`}</span>
                </div>
                <div>
                    <textarea
                    onBlur={(e) => {
                        if (e.currentTarget === e.target) {
                            console.log('unfocused input box')
                        }
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            console.log('clicking somewhere else entirely')
                        }
                    }}

                    onFocus={(e) => {
                        if (e.currentTarget === e.target) {
                            console.log('focusing on input box')
                        }
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            console.log('clicking on myself???')
                        }
                    }}
                    value={'text-area-box'} placeholder="Add a comment."></textarea>
                    <button disabled={true} className="post-comment-button">Post</button>
                </div>
            </>

        )
    }
}

export default Post
