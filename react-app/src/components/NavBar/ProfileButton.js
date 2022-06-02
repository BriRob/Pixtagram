import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getUserThunk } from "../../store/user";


const ProfileButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector(
    (state) => state?.userReducer?.user?.profile_pic_url
  );
  const [showMenu, setShowMenu] = useState(false);



  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    dispatch(sessionActions.authenticate())
    dispatch(getUserThunk(user.id))
    console.log('RERENDERING FROM PROF BUTTON --------------');
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <button onClick={openMenu} className='profile-button'>
        <img src={user.profile_pic_url}></img>
      </button>
      {showMenu && (
        <div className="dropdownmenu">
          <NavLink to={`/users/${user.id}`}>Profile</NavLink>
          <NavLink to={`/users/${user.id}/edit`}>Settings</NavLink>
          <NavLink to={`/aboutus`} className='aboutus'>About Us</NavLink>

          <button 
          onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;