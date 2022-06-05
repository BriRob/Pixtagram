import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getUserThunk } from "../../store/user";
import { profileDropDown, settingsDropDown } from "./Navicons";

const ProfileButton = ({ profileStatus }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const profile = useSelector(
  //   (state) => state?.userReducer?.user?.profile_pic_url
  // );
  const [showMenu, setShowMenu] = useState(profileStatus);

  // const hideMenu = () => {
  //   setShowMenu(!showMenu)
  // }

  function menuToggle(e) {
    e.stopPropagation();
    setShowMenu(!showMenu);
    // if (showMenu === true) {
    //   setShowMenu(false)
    //   return;
    // } else {
    //   setShowMenu(true)
    //   return;
    // }
  }

  useEffect(() => {
    dispatch(sessionActions.authenticate());
    // dispatch(getUserThunk(user.id))

    const closeMenu = () => {
      setShowMenu(false);
    };

    const iconsDiv = document.getElementsByClassName("icons")[0];
    iconsDiv.addEventListener("click", closeMenu);
    document.addEventListener("click", closeMenu);

    return document.removeEventListener("click", closeMenu);
    // iconsDiv.removeEventListener('click', closeMenu)
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      {/* <button onClick={e => menuToggle(e, showMenu)} className='profile-button'> */}
      <button onClick={(e) => menuToggle(e)} className="profile-button">
        <img src={user.profile_pic_url}></img>
      </button>
      {showMenu && (
        <div className="dropdownmenu">
          <NavLink to={`/users/${user.id}`} className="dropdownOptions">
            <div className="dropdownIcon">{profileDropDown}</div> <div>Profile</div>
          </NavLink>
          <NavLink to={`/users/${user.id}/edit`} className="dropdownOptions">
            <div className="dropdownIcon">{settingsDropDown}</div> Settings
          </NavLink>
          <NavLink to={`/explore-page`} className="aboutus dropdownOptions'">
            About Us
          </NavLink>
          <button className='log-out-button' onClick={logout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
