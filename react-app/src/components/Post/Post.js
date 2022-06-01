import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePostThunk } from "../../store/post"



function Post() {
    const dispatch = useDispatch()
    const post = useSelector((state) => state.posts.post)


    const {postId} = useParams()
    console.log(postId, "yoooo")
    useEffect(() => {
        dispatch(getOnePostThunk(postId))
    }, [dispatch])



    return (
        <>
        {post && <h1 style={{"paddingTop": '300px'}}>{post.caption}</h1>}
        </>

    )
}

export default Post
