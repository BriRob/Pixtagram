
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './index.css'
import { house, postIcon, exploreIcon, heartHomeIcon, filledHouseIcon, filledPostIcon, filledExploreIcon, filledHeartHomeIcon } from './Navicons';

const NavBar = () => {
  const user = useSelector((state)=> state.session.user)
  // const userName = user.full_name.split(' ').join('')
  // console.log(userName)
  console.log(user.id)

  const [searchField, setSearchField] = useState('Seach')
  const [houseColor, setHouseColor] = useState(house)
  const [postIconColor, setPostIconColor] = useState(postIcon)
  const [exploreIconColor, setExploreIconColor] = useState(exploreIcon)
  const [heartIconColor, setHeartIconColor] = useState(heartHomeIcon)

  const logo = (<img src="https://fontmeme.com/permalink/220528/c175d4b5354eae87b98b5233d328cfd5.png" id='pixtagram-logo' alt='pixtagram' border='0'></img>)
  const profilePicture = (<img to='/users/:id' src='https://i.pinimg.com/736x/a3/f4/7d/a3f47d7e95ae47fdae92fdf50d9a39a2.jpg' id='profile-pic-nav-bar' alt='profile-picture-icon'></img>)
  const removeIconColor = () => {
    setHouseColor(house)
    setPostIconColor(postIcon)
    setExploreIconColor(exploreIcon)
    setHeartIconColor(heartHomeIcon)
  }

  const fillInHouse = (e) => {
    e.stopPropagation()
    removeIconColor()
    setHouseColor(filledHouseIcon)
  }

  const fillInPost = (e) => {
    e.stopPropagation()
    removeIconColor()
    setPostIconColor(filledPostIcon)
  }

  const fillInExplore = (e) => {
    e.stopPropagation()
    removeIconColor()
    setExploreIconColor(filledExploreIcon)
  }

  const fillInNavHeart = (e) => {
    e.stopPropagation()
    removeIconColor()
    setHeartIconColor(filledHeartHomeIcon)
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
          <div>
            <label>
              <input
                className='search-bar'
                color={searchField === 'Search' ? "grey" : "white"}
                value={searchField}
                onChange={(e) => printThing(e)}
                onMouseEnter={() => setSearchField("")}
                onMouseLeave={() => setSearchField('Search')}
              ></input>
            </label>
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
      <ul>
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
      </ul>
    </nav >
  );
}

export default NavBar;
