import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import CreatePost from "../PostPages/CreatePost";
import "./index.css";
import {
  house,
  postIcon,
  exploreIcon,
  heartHomeIcon,
  darkModeHomeIcon,
  darkModeFilledInHomeIcon,
  darkModeExploreIcon,
  darkModeFilledInExploreIcon,
  filledPostIcon,
  filledExploreIcon,
  filledHeartHomeIcon,
  darkModeFilledInPostIcon,
  darkModeHeartHomeIcon,
  darkModePostIcon,
  darkModeFilledInHeartHomeIcon,
  darkModeSearchIcon,
} from "./Navicons";
import ProfileButton from "./ProfileButton";
import { getUserThunk } from "../../store/user";
import image from "./svgexport-17.png";

const NavBar = () => {
  const dispatch = useDispatch();
  // const location = useLocation()
  const { pathname } = useLocation();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector(
    (state) => state?.userReducer?.user?.profile_pic_url
  );

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    if (showModal) return;
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(getUserThunk(user.id));
    // if (!showModal) return;

    // const closeModal = () => {
    //   setShowModal(false);
    // };
    // const modal = document.getElementsByClassName('createPostModal')[0]
    // // document.addEventListener("click", closeModal);
    // modal.addEventListener('click', (e) => {
    //   e.target.('showModal')
    // })
    if (pathname !== "/") {
      // setHouseColor(darkModeHomeIcon);
      removeIconColor();
    }

    // return () => document.removeEventListener("click", showModal);
  }, [dispatch]);
  // const userName = user.full_name.split(' ').join('')
  // console.log(userName)
  // console.log(user.id)

  //regular font link https://fontmeme.com/permalink/220528/c175d4b5354eae87b98b5233d328cfd5.png

  // const [searchField, setSearchField] = useState(`Search`)
  const [houseColor, setHouseColor] = useState(darkModeHomeIcon);
  const [postIconColor, setPostIconColor] = useState(darkModePostIcon);
  const [exploreIconColor, setExploreIconColor] = useState(darkModeExploreIcon);
  const [heartIconColor, setHeartIconColor] = useState(darkModeHeartHomeIcon);

  const [valueState, setValueState] = useState("");

  const logo = (
    <img
      src="https://fontmeme.com/permalink/220601/86a21de467499ff0a91e214d1a326624.png"
      id="pixtagram-logo"
      alt="pixtagram"
      border="0"
    ></img>
  );
  const profilePicture = (
    <img
      to="/users/:id"
      src={`${profile}`}
      id="profile-pic-nav-bar"
      alt="profile-picture-icon"
    ></img>
  );
  const removeIconColor = () => {
    setHouseColor(darkModeHomeIcon);
    setPostIconColor(darkModePostIcon);
    setExploreIconColor(darkModeExploreIcon);
    setHeartIconColor(darkModeHeartHomeIcon);
  };

  const fillInHouse = (e) => {
    e.stopPropagation();
    removeIconColor();
    setHouseColor(darkModeFilledInHomeIcon);
  };

  const fillInPost = (e) => {
    e.stopPropagation();
    removeIconColor();
    setPostIconColor(darkModeFilledInPostIcon);
    openModal();
    // return (
    //   <CreatePost boolean={true}/>
    // )
  };

  const fillInExplore = (e) => {
    e.stopPropagation();
    removeIconColor();
    setExploreIconColor(darkModeFilledInExploreIcon);
  };

  const fillInNavHeart = (e) => {
    e.stopPropagation();
    removeIconColor();
    setHeartIconColor(darkModeFilledInHeartHomeIcon);
  };

  const printThing = (e) => {
    console.log(e.nativeEvent.data);
  };

  const inputReader = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.nativeEvent.data);
  };

  return (
    <div className="nav-bar">
      <div className="child-nav-bar-container">
        <div id="nav-bar-container">
          <div className="logo-container">
            <NavLink to="/" exact={true}>
              {logo}
            </NavLink>
          </div>
          <div className="search-parent-container">
            <div className="search-bar">
              <form
                className="search-form"
                style={{ background: `url(${image}) no-repeat 13px` }}
              >
                <input
                  className="search-input"
                  onChange={(e) => inputReader(e)}
                  placeholder="Search..."
                  type="search"
                ></input>
              </form>
            </div>
          </div>
          <div className="icons">
            <NavLink
              className="icon-links"
              to="/"
              exact={true}
              id="house-icon-id"
              onClick={(e) => fillInHouse(e)}
            >
              {houseColor}
            </NavLink>
            <div className="icon-links" onClick={(e) => fillInPost(e)}>
              {postIconColor}
            </div>
            <NavLink
              className="icon-links"
              to="/"
              exact={true}
              id="explore-icon-id"
              onClick={(e) => fillInExplore(e)}
            >
              {exploreIconColor}
            </NavLink>
            <NavLink
              className="icon-links"
              to="/"
              exact={true}
              id="heart-icon-nav-id"
              onClick={(e) => fillInNavHeart(e)}
            >
              {heartIconColor}
            </NavLink>
            <ProfileButton user={user} profile={profile} />
          </div>
        </div>
        <div>
          {showModal && (
            <CreatePost
              hideModal={() => setShowModal(false)}
              changePostIcon={() => setPostIconColor(darkModePostIcon)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
