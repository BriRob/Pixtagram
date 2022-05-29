import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm'
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UserPages/UsersList';
import User from './components/UserPages/Profile';
import EditUser from './components/UserPages/EditUser';
import Splash from './components/Splash/Splash';
import { authenticate } from './store/session';
import { getAllUsersThunk } from './store/user';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users)
  console.log(users)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllUsersThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path='/users/:userId/edit' exact={true}>
          <EditUser users={users}/>
        </ProtectedRoute>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Splash />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
