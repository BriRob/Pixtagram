import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import LogoutButton from "../auth/LogoutButton";
import CreatePost from "../PostPages/CreatePost";
import "./index.css";
import {
  darkModeHomeIcon,
  darkModeFilledInHomeIcon,
  darkModeExploreIcon,
  darkModeFilledInExploreIcon,
  darkModeFilledInPostIcon,
  // darkModeHeartHomeIcon,
  darkModePostIcon,
  // darkModeFilledInHeartHomeIcon,
} from "./Navicons";
import ProfileButton from "./ProfileButton";
// import { getUserThunk } from "../../store/user";
import image from "./svgexport-17.png";
// import SearchModal from "./SearchModal";
import SearchBar from "../test/SearchBar";

const NavBar = () => {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const { pathname } = useLocation();
  const user = useSelector((state) => state.session.user);
  // const profile = useSelector(
  //   (state) => state?.userReducer?.user?.profile_pic_url
  // );

  const [showModal, setShowModal] = useState(false);
  // const [searchInput, setSearchInput] = useState("");
  const [houseColor, setHouseColor] = useState(darkModeFilledInHomeIcon);
  const [postIconColor, setPostIconColor] = useState(darkModePostIcon);
  const [exploreIconColor, setExploreIconColor] = useState(darkModeExploreIcon);
  // const [heartIconColor, setHeartIconColor] = useState(darkModeHeartHomeIcon);
  const [profileStatus, setProfileStatus] = useState(false);
  // const [myOptions, setMyOptions] = useState([]);
  // console.log("location pathname \n\n", pathname)
  // console.log('THIS IS THE STATUS FROM NAVBAR', profileStatus)
  // console.log('RERENDERING FROM NAVBAR', profileStatus)
  // const getDataFromApi = () => {

  // function menuToggle(e, showModal) {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (showModal) {
  //     setShowModal(false)
  //   } else {
  //     setShowModal(true)
  //   }
  // }

  // function inputReader(e, val){
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (e.nativeEvent.data !== null){
  //     let input = val + e.nativeEvent.data
  //     setSearchInput(input)
  //   }
  //   console.log(searchInput)
  // }

  // function searchToggle(e, showSearch) {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (showSearch) {
  //     console.log('am i here 1')
  //     setShowSearch(false)
  //   } else {
  //     console.log('am i here 2')
  //     setShowModal(true)
  //   }
  // }

  // const openSearch = () => {
  //   if (showSearch) return;
  //   setShowSearch(true);
  // }

  const openProfileDropdown = () => {
    setProfileStatus(true)
  }

  const openModal = () => {
    // if (showModal) return;
    setShowModal(true);
  };

  // useEffect(() => {
  //   // dispatch(getUserThunk(user.id));
  //   if (pathname !== "/") {
  //     removeIconColor();
  //   }
  // }, [searchInput]);

  //regular font link https://fontmeme.com/permalink/220528/c175d4b5354eae87b98b5233d328cfd5.png

  const logo = (
    <img
      src="https://fontmeme.com/permalink/220601/86a21de467499ff0a91e214d1a326624.png"
      id="pixtagram-logo"
      alt="pixtagram"
      border="0"
    ></img>
  );
  // const profilePicture = (
  //   <img
  //     to="/users/:id"
  //     src={`${profile}`}
  //     id="profile-pic-nav-bar"
  //     alt="profile-picture-icon"
  //   ></img>
  // );
  const removeIconColor = () => {
    setHouseColor(darkModeHomeIcon);
    setPostIconColor(darkModePostIcon);
    setExploreIconColor(darkModeExploreIcon);
    // setHeartIconColor(darkModeHeartHomeIcon);
  };

  const fillInHouse = (e) => {
    e.stopPropagation();
    removeIconColor();
    setHouseColor(darkModeFilledInHomeIcon);
    setProfileStatus(false);
  };

  const fillInPost = (e) => {
    e.stopPropagation();
    removeIconColor();
    setPostIconColor(darkModeFilledInPostIcon);
    setProfileStatus(false);
    openModal();
  };

  const fillInExplore = (e) => {
    e.stopPropagation();
    removeIconColor();
    setExploreIconColor(darkModeFilledInExploreIcon);
    setProfileStatus(false);
  };

  // const fillInNavHeart = (e) => {
  //   e.stopPropagation();
  //   removeIconColor();
  //   // setHeartIconColor(darkModeFilledInHeartHomeIcon);
  //   setProfileStatus(false);
  // };

  // function toggleSearch(e) {
  //   if (!showSearch) {
  //     setShowSearch(true)
  //   } else {
  //     setShowSearch(false)
  //   }
  //   return;
  // }

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
              <div
                style={{ background: `url(${image}) no-repeat 13px` }}
                className="search-form"
              >
                {/* <form className="search-form"
                style={{ 'background': `url(${image}) no-repeat 13px` }}
                // onClick={e => searchToggle(e, showSearch)}
                > LEAVE THIS COMMENT HERE FOR SPRINT WEEK :D */}
                <SearchBar />
                {/* {showSearch && (<SearchModal user={user} profile={profile} />)} */}
                {/* </form> */}
              </div>
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
              to="/explore-page"
              exact={true}
              id="explore-icon-id"
              onClick={(e) => fillInExplore(e)}
            >
              {exploreIconColor}
            </NavLink>
            {/* <NavLink
              className="icon-links"
              to="/"
              exact={true}
              id="heart-icon-nav-id"
              onClick={(e) => fillInNavHeart(e)}
            >
              {heartIconColor}
            </NavLink> */}
            <button className="profile-button" onClick={() => openProfileDropdown()}>
              <img src={user.profile_pic_url} alt='user'></img>
            </button>
            {profileStatus && (
              <>
                <div
                  className="outerDropDown"
                  onClick={() => setProfileStatus(false)}
                ></div>
                <ProfileButton status={() => setProfileStatus(false)} />
              </>
            )}
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
  )
};

export default NavBar;
