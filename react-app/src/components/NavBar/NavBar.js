
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './index.css'
import {
  house, postIcon, exploreIcon, heartHomeIcon,
  darkModeHomeIcon, darkModeFilledInHomeIcon, darkModeExploreIcon, darkModeFilledInExploreIcon,
  filledPostIcon, filledExploreIcon,
  filledHeartHomeIcon,
  darkModeFilledInPostIcon,
  darkModeHeartHomeIcon,
  darkModePostIcon,
  darkModeFilledInHeartHomeIcon, darkModeSearchIcon
} from './Navicons';

const NavBar = () => {
  const user = useSelector((state) => state.session.user)
  const profile = useSelector((state) => state?.userReducer?.user?.profile_pic_url)
  // const userName = user.full_name.split(' ').join('')
  // console.log(userName)
  // console.log(user.id)


  //regular font link https://fontmeme.com/permalink/220528/c175d4b5354eae87b98b5233d328cfd5.png

  // const [searchField, setSearchField] = useState(`Search`)
  const [houseColor, setHouseColor] = useState(darkModeHomeIcon)
  const [postIconColor, setPostIconColor] = useState(darkModePostIcon)
  const [exploreIconColor, setExploreIconColor] = useState(darkModeExploreIcon)
  const [heartIconColor, setHeartIconColor] = useState(darkModeHeartHomeIcon)

  const [valueState, setValueState] = useState('')
  const logo = (<img src="https://fontmeme.com/permalink/220601/86a21de467499ff0a91e214d1a326624.png" id='pixtagram-logo' alt='pixtagram' border='0'></img>)
  const profilePicture = (<img to='/users/:id' src={`${profile}`} id='profile-pic-nav-bar' alt='profile-picture-icon'></img>)
  const removeIconColor = () => {
    setHouseColor(darkModeHomeIcon)
    setPostIconColor(darkModePostIcon)
    setExploreIconColor(darkModeExploreIcon)
    setHeartIconColor(darkModeHeartHomeIcon)
  }

  const fillInHouse = (e) => {
    e.stopPropagation()
    removeIconColor()
    setHouseColor(darkModeFilledInHomeIcon)
  }

  const fillInPost = (e) => {
    e.stopPropagation()
    removeIconColor()
    setPostIconColor(darkModeFilledInPostIcon)
  }

  const fillInExplore = (e) => {
    e.stopPropagation()
    removeIconColor()
    setExploreIconColor(darkModeFilledInExploreIcon)
  }

  const fillInNavHeart = (e) => {
    e.stopPropagation()
    removeIconColor()
    setHeartIconColor(darkModeFilledInHeartHomeIcon)
  }

  const printThing = (e) => {
    console.log(e.nativeEvent.data)
  }

  return (
    <nav>
      <div>
        <div id='nav-bar-container'>
          <div>
            <NavLink to='/' exact={true}>{logo}</NavLink>
          </div>
          <div className='_aawf_aawg'>
            <input
              aria-label='Search input'
              autoCapitalize='none'
              className='search-bar'
              // color={searchField === 'Search' ? "grey" : "white"}
              value={''}
              placeholder='Search'
              type='text'

            />
            <div className='_aaw8' role='button' tabIndex='0'>
              <div className='_aaw9'>
                {darkModeSearchIcon}
              </div>
              <span className='search-text'></span>

            </div>
          </div>
          <div className='icons'>
            <NavLink to='/' exact={true} id='house-icon-id' onClick={(e) => fillInHouse(e)}>{houseColor}</NavLink>
            <NavLink to='/' exact={true} id='post-icon-id' onClick={(e) => fillInPost(e)}>{postIconColor}</NavLink>
            <NavLink to='/' exact={true} id='explore-icon-id' onClick={(e) => fillInExplore(e)}>{exploreIconColor}</NavLink>
            <NavLink to='/' exact={true} id='heart-icon-nav-id' onClick={(e) => fillInNavHeart(e)}>{heartIconColor}</NavLink>
            <NavLink to={`/users/${user.id}`} exact={true}>{profilePicture}</NavLink>
          </div>
        </div>
      </div>
      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav >
  );
}

export default NavBar;
