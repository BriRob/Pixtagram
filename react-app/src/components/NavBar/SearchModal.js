import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import { getUserThunk } from "../../store/user";
import './index.css'
import LoadingSpinner from "../Spinner/Spinner";
import { findUsersThunk } from "../../store/search";

function SearchModal({myOptions}) {

    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const profile = useSelector(
        (state) => state?.userReducer?.user?.profile_pic_url
    );
    const searchUsers = useSelector((state) => state.searchReducer.users)
    const [isLoaded, setIsLoaded] = useState(false)
    const [users, setUsers] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // const [allPeople, setAllPeople] = useState([])
    const findUsers = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        e.stopPropagation();
        const response = await fetch('/api/users/all')
        const people = await response.json()
        let allUsers = people.users
        // console.log(allUsers)
        // setAllPeople(allUsers)
        setUsers(allUsers)
        setIsLoaded(true)
        dispatch(findUsersThunk())
    }
    useEffect(() => {

    }, [isLoaded, isLoading])

    return (
        <div className="search-field-box">
            {!isLoaded &&<h4 className="recent">Recent</h4>}
            {!isLoaded &&<span className="no-searches">No recent searches.</span>}
            {!isLoaded && <button onClick={e => findUsers(e)} className="no-searches">Click me to run the back end :D</button>}
            {myOptions? myOptions.map(user => <>
                <ul key={`${user.id}`}>
                    <NavLink style={{'textDecoration':'none'}}to={`/users/${user.id}`}>{`${user.full_name}`}</NavLink>
                </ul>
            </>
            ) : isLoading ? <LoadingSpinner /> : null}
        </div>
    );
};

export default SearchModal
