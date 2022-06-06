import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import { getUserThunk } from "../../store/user";
import { profileDropDown, settingsDropDown } from "./Navicons";

const ProfileButton = ({status}) => {


  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const profile = useSelector(
  //   (state) => state?.userReducer?.user?.profile_pic_url
  // );
  // const [showMenu, setShowMenu] = useState(status);
  // const hideMenu = () => {
  //   setShowMenu(!showMenu)
  // }

  // function menuToggle(e) {
  //   e.stopPropagation();
  //   // setShowMenu(!showMenu);
  //   console.log("THIS IS THE SHOWMENU", showMenu);
  //   if (showMenu === true) {
  //     setShowMenu(false);
  //     return;
  //   } else {
  //     setShowMenu(true);
  //     return;
  //   }
  // }
  // console.log('RERENDERING FROM PROFILEBUTTON')

  // useEffect(() => {
  //   dispatch(sessionActions.authenticate());
  //   // dispatch(getUserThunk(user.id))

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   // document.addEventListener("click", closeMenu);
  //   const iconsDiv = document.getElementsByClassName("icons")[0];
  //   iconsDiv.addEventListener("click", closeMenu);

  //   return iconsDiv.removeEventListener("click", closeMenu);
  //   // return document.removeEventListener("click", closeMenu);
  // }, [dispatch]);


  const logoutFunc = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(sessionActions.logout());
  };


  return (
    <div>
      <div className="dropdownmenu" onClick={() => status()}>
        <NavLink to={`/users/${user.id}`} className="dropdownOptions">
          <div className="dropdownIcon">{profileDropDown}</div>{" "}
          <div>Profile</div>
        </NavLink>
        <NavLink to={`/users/${user.id}/edit`} className="dropdownOptions">
          <div className="dropdownIcon">{settingsDropDown}</div> Settings
        </NavLink>
        <NavLink to={`/explore-page`} className="aboutus dropdownOptions'">
          About Us
        </NavLink>
        <button className="log-out-button" onClick={logoutFunc}>
          Log Out
        </button>
      </div>
    </div>
  );
};


export default ProfileButton;

