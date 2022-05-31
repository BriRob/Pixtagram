import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import LoginForm from "../auth/LoginForm"
import './Splash.css'
import { getUserThunk } from "../../store/user"

function Splash(){
const dispatch = useDispatch()
const history = useHistory()
const id = useSelector((state) => state.session.user.id)


useEffect(()=> {
    dispatch(getUserThunk(id))
}, [dispatch])


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
