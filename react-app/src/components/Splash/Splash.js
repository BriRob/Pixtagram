import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import './Splash.css'

function Splash(){
const history = useHistory()
const id = useSelector((state) => state.session.user.id)

function goToProfile(){
    history.push(`/users/${id}`)
}

return(
    <>
    <h1>My Home Page</h1>
    <button onClick={(e) => goToProfile(e)}>Go to profile</button>
    </>
)


}

export default Splash
