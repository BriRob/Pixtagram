import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFollowingThunk, getUserThunk } from "../../store/user";
import "./Follows.css"

function Following({userId, hideFollowing}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const followingObj = useSelector((state) => state.userReducer.userFollowing)

    // console.log("Followers from COMPONENT", followersObj)

    let following;

    if (followingObj) {
        following = Object.values(followingObj)
    }


    useEffect(() => {
        dispatch(getFollowingThunk(userId))

    }, [dispatch])

    const goToProfile = async (followingId) => {
        hideFollowing()
        await dispatch(getUserThunk(followingId))
        history.push(`/users/${followingId}`)
    }

    return (<>
    <h3 className="h3Follow">Following</h3>
    {following?.length === 0 ? <div className="noFollows">No Following</div> :

    following?.map((user, idx) => (

        <div className="eachFollowName" key={idx} onClick={() => goToProfile(user.id)}>{user.username}</div>
        ))
    }
    </>)
}
export default Following;
