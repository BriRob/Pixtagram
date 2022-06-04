import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './explore.css'
import { getAllAdminsThunk } from '../../store/admins'
import LoadingSpinner from '../Spinner/Spinner';


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

    if (!isLoaded) {
        return <LoadingSpinner />
    } else {
        return (
            <>
                <div className='page-container'>
                    <div className='profile-cards'>
                        {admins ? admins.map((admin) => (
                            <div className='square'>
                            <div key={admin.id}>
                            <h2 className='username-header'>{admin.full_name}</h2>
                            <img className='admin-profile' src={admin.profile_pic_url} alt='admin profile picture'></img>
                            <div className='info-card'>
                                <span className='admin-bio'>{admin.bio}</span>
                            </div>
                            </div>
                            </div>
                        )) : <LoadingSpinner />}
                    </div>
                </div>
            </>
        )
    }
}

export default Explore
