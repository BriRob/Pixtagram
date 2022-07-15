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
        console.log("What are followers? \n\n", followers)
    }


    useEffect(() => {
        (async() => {
            // let idk = await dispatch(getFollowersThunk(userId))
            await dispatch(getFollowersThunk(userId))
            // console.log("Hi IDK \n\n",idk)
        })()
        // let idk = dispatch(getFollowersThunk(userId))
        // console.log("This is IDK \n\n",idk)
    }, [dispatch])

    return (<>
    {followers?.map((follower, idx) => (

        <div key={idx}> {follower.username}</div>
    ))}
    </>)
}
export default Followers;
