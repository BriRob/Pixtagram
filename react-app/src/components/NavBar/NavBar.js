
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

const NavBar = () => {
  const dispatch = useDispatch();
  // const location = useLocation()
  const {pathname} = useLocation()
  const user = useSelector((state) => state.session.user);
  const profile = useSelector(
    (state) => state?.userReducer?.user?.profile_pic_url
  );

  const [showModal, setShowModal] = useState(false);
  console.log("location pathname \n\n", pathname)


  function menuToggle(e, showModal){
    e.preventDefault()
    e.stopPropagation()
    if(showModal){
      setShowModal(false)
    }else{
      setShowModal(true)
    }
  }


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
      removeIconColor()
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

  return (
    <div className="nav-bar">
      <div id="nav-bar-container">
        <div>
          <NavLink to="/" exact={true}>
            {logo}
          </NavLink>
        </div>
        <div className="_aawf_aawg">
          <input
            aria-label="Search input"
            autoCapitalize="none"
            className="search-bar"
            // color={searchField === 'Search' ? "grey" : "white"}

            value={""}
            placeholder="Search"
            type="text"
            readOnly
          />
          <div className="_aaw8" role="button" tabIndex="0">
            <div className="_aaw9">{darkModeSearchIcon}</div>
            <span className="search-text"></span>
          </div>
        </div>
        <div className="icons">
          <NavLink
            to="/"
            exact={true}
            id="house-icon-id"
            onClick={(e) => fillInHouse(e)}
          >
            {houseColor}
          </NavLink>
          <NavLink
            to="/"
            exact={true}
            id="post-icon-id"
            onClick={(e) => fillInPost(e)}
          >
            {postIconColor}
          </NavLink>
          <NavLink
            to="/"
            exact={true}
            id="explore-icon-id"
            onClick={(e) => fillInExplore(e)}
          >
            {exploreIconColor}
          </NavLink>
          <NavLink
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
  );
};

export default NavBar;
