import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

const ProfileButton = ({ user, profile }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);



  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
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
        <img src={profile}></img>
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