import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
import pixta from '../../images/splash.png'
import logo from '../../images/logo.png'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  // Demo Login
  const demoUser = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io"
    const password = "password"

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  }


  const errorStyles = {'margin-top': '20px'};

  return (
    <>
      <div id='full-page-container'>
        <div id='top-page-container'>

          <div className='left-container'>
            <img alt='pixtagram intro' id='image' src={pixta}></img>
          </div>

          <div id='right-container'>
            <div id='l-border-div'>
              <div id='heading-div'>
                <img alt='pixtagram logo' id='s-logo' src={logo}></img>
              </div>

              <div id='login-form-div'>
                <form id='form-elements' onSubmit={onLogin}>
                  <div>
                    <label className='input-label' htmlFor='email'>Email</label>
                    <input
                      className='l-input'
                      name='email'
                      type='text'
                      placeholder='Email'
                      value={email}
                      onChange={updateEmail}
                    />
                  </div>
                  <div>
                    <label className='input-label' htmlFor='password'>Password</label>
                    <input
                      className='l-input'
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}

                    />
                  </div>
                  <button disabled={!password || !email} id='login-button' type='submit'>Log In</button>
                      {errors && <div class='login-error-div'>
                        {errors.map((error, ind) => (
                          <div id='errors' key={ind}>{error}</div>
                        ))}
                      </div>}
                </form>
              </div>
                <div style={errors.length > 0? errorStyles: null} className='l-or-divider'>
                  <div className='l-line'></div>
                  <div id='or'> OR </div>
                  <div className='l-line'></div>
                </div>
                <div className='l-demo-div'>
                  <button id='l-demo-button' onClick={demoUser}>Log in as a Demo User</button>
                </div>

            </div>

            <div id='l-signup-div'>
              <p id='l-text'>Don't have an account? <a id='s-link' href='/sign-up'>Sign Up</a></p>
            </div>
          </div>
        </div>

        <div  id='footer'>
          <p className='c-name'>Python</p>
          <p className='c-name'>Javascript</p>
          <p className='c-name'>HTML</p>
          <p className='c-name'>CSS</p>
          <p className='c-name'>React</p>
          <p className='c-name'>Redux</p>
          <p className='c-name'>Flask</p>
          <p className='c-name'>SQLAlchemy</p>
          <p className='c-name'>Docker</p>
        </div>

        <div id='creators'>
          <a href={`https://github.com/BriRob/Pixtagram`} className='c-name'>© 2022 Pixtagram</a>
            <a href={`https://github.com/AgustinZucca`} className='c-name'>Agustin Zucca</a>
            <a href={`https://github.com/AnthonyBronca`} className='c-name'>Anthony Bronca</a>
            <a href={`https://github.com/BriRob`} className='c-name'>Briana Robinson</a>
            <a href={`https://github.com/itsmaica`} className='c-name'>Maica Santos</a>
        </div>
      </div>


    </>
  );
};

export default LoginForm;
