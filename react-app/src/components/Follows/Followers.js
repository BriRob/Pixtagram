import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowersThunk } from "../../store/user";

function Followers({userId}) {


    const dispatch = useDispatch()
    const followersObj = useSelector((state) => state.userReducer.userFollowers)

    // console.log("Followers from COMPONENT", followersObj)

    let followers;

    if (followersObj) {
        followers = Object.values(followersObj)
    }


    useEffect(() => {
        dispatch(getFollowersThunk(userId))

    }, [dispatch])

    return (<>
    {followers?.map((follower, idx) => (

        <div key={idx}> {follower.username}</div>
    ))}
    </>)
}
export default Followers;
