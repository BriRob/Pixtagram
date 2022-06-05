import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import './explore.css'
import { getAllAdminsThunk } from '../../store/admins'
import LoadingSpinner from '../Spinner/Spinner';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

import CheckMark from '../CheckMark/CheckMark';



function Explore() {
    const history = useHistory();
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.adminsReducer.admins)
    const [isLoaded, setLoaded] = useState(false)
    console.log(admins, "this is admins")


    useEffect(() => {
        dispatch(getAllAdminsThunk())
        setLoaded(true)
    }, [isLoaded])

    function sendToProfile(e, id){
        return <Redirect to={`/users/${id}`} />;
    }

    // if (!isLoaded) {
    //     return <LoadingSpinner />
    // } else {
        return (
            <>
                <div className='page-container'>
                    <div className='profile-cards'>
                        {admins ? admins.map((admin) => (
                            <NavLink to={`/users/${admin.id}`}>
                            <div className='card-container'>
                            <div className='square'>
                                <div className='card-box' onClick={(e)=> sendToProfile(admin.id)} key={admin.id}>
                                    <div className='header-name'>
                                        <h2 className='username-header'>{admin.full_name} <CheckMark /></h2>
                                    </div>
                                    {isLoaded? <AnimatedBackground/>: null}
                                        <img className='admin-profile' src={admin.profile_pic_url} alt='admin profile picture'></img>
                                    <div className='info-card'>
                                        <span className='admin-bio'>{admin.bio}</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </NavLink>
                        )) : <div className='loading'><LoadingSpinner /></div>}
                    </div>
                </div>
            </>
        )
    // }
}

export default Explore
