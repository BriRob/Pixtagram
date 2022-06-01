import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import LoginForm from "../auth/LoginForm"
import './Splash.css'
import { getUserThunk } from "../../store/user"
import { dotDotDotIcon } from "./SplashIcons"

function Splash(){
const dispatch = useDispatch()
const history = useHistory()
const id = useSelector((state) => state.session.user.id)


useEffect(()=> {
    dispatch(getUserThunk(id))
}, [dispatch])


// function goToProfile(){
//     history.push(`/users/${id}`)
// }

if (!id) {
    return <Redirect to='/login' />;
}
return(
    <>
    <div className="home-page-body">
    <div className="stories-container"></div>
    <div className="feed">
        <div className="post-card">
            <div className="user-profile-info">
                <img src="https://findingnatureblog.files.wordpress.com/2017/01/children-1822474_1280.jpg" style={{'height':'40px', 'width':'40px', 'border-radius':'50px'}}></img>
                <div className="picture-info">
                    <span style={{'color':'white', 'fontWeight':'bold'}}>User name</span>
                </div>
                <div className="dotdotdot">
                {dotDotDotIcon}
                </div>
            </div>
        <ul className="pictures">
            <img className="feed-test" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg"></img>
            <img className="feed-test" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty.jpg/1280px-24701-nature-natural-beauty.jpg"></img>
            <img className="feed-test" src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg"></img>
            <img className="feed-test" src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg"></img>
        </ul>
        </div>
    </div>
    {/* <button onClick={(e) => goToProfile(e)}>Go to profile</button> */}
    </div>
    </>
)


}

export default Splash
