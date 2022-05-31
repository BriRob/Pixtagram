import { useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import LoginForm from "../auth/LoginForm"
import './Splash.css'

function Splash(){
const history = useHistory()
const id = useSelector((state) => state.session.user.id)

function goToProfile(){
    history.push(`/users/${id}`)
}

if (!id) {
    return <Redirect to='/login' />;
}
return(
    <>
    <h1>My Home Page</h1>
    <button onClick={(e) => goToProfile(e)}>Go to profile</button>
    </>
)


}

export default Splash
