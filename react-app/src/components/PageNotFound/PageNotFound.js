// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getCommentsThunk } from "../../store/comment";
// import LoadingSpinner from "../Spinner/Spinner";
// import { deleteCommentThunk } from "../../store/comment";
import "./PageNotFound.css";
// import checkmark from "../CheckMark/checkmark.png";
// import { closeButton } from "../NavBar/Navicons";
import { Link } from "react-router-dom";
// import Comments from "../Comments/Comments";
import pagenotfound from '../../images/pagenotfound.gif'

function PageNotFound() {
    // const dispatch = useDispatch()
    // const history = useHistory()

    return (
        <>
        <div className="p-container">
            <h1 id='p-sorry'>Sorry, this page isn't available.</h1>
            <p id='p-text'>The link you followed may be broken, or the page may have been removed.
            <Link id='p-pixta-link' to={`/`}>Go back to Pixtagram</Link>
            </p>
        </div>
            <div className="gif">
                <div id='gif-container'>
                    <img id='e-egg' src={pagenotfound} alt='tilting nessie'/>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;
