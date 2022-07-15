import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingThunk } from "../../store/user";

function Following({userId}) {
    const dispatch = useDispatch()
    const followingObj = useSelector((state) => state.userReducer.userFollowing)

    // console.log("Followers from COMPONENT", followersObj)

    let following;

    if (followingObj) {
        following = Object.values(followingObj)
    }


    useEffect(() => {
        dispatch(getFollowingThunk(userId))

    }, [dispatch])

    return (<>
    {following?.map((user, idx) => (

        <div key={idx}> {user.username}</div>
    ))}
    </>)
}
export default Following;
