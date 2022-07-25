import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './SignUpForm.css'
import logo from '../../images/logo.png'

// ms-comment may-30

const SignUpForm = () => {
  // const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [full_name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(full_name, username, email, password));
      if (data) {
        // console.log('FROM SIGNUP--DATA', data)
        setErrors(data)
      }
    } else {
      setErrors(["Password does not match Confirmed Password"])
    }
  };

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

  // console.log('ERRORS FROM SINGNUP', errors)


  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id='signup-container'>
        <div id='signup-holder'>

          <div id='s-border'>

              <div className='top-logo-container'>
                <img alt='logo' id='s-logo' src={logo}></img>
                <p id='text'>Signup to see photos and gifs from your friends.</p>
                <button className='s-button' onClick={demoUser}>Log in as Demo</button>
              </div>

              <div id='or-divider'>
                <div className='line'></div>
                <div id='or'> OR </div>
                <div className='line'></div>
              </div>
            <div>
              <div className='signup-form-container'>
                <form onSubmit={onSignUp} id='signup-form'>
                  <div>
                    <label className='signup-label'>Full Name</label>
                    <input
                      className='s-input'
                      type='text'
                      name='full_name'
                      onChange={updateFullName}
                      value={full_name}
                      placeholder='Full Name'></input>
                  </div>
                  <div>
                    <label className='signup-label'>Username</label>
                    <input
                      className='s-input'
                      type='text'
                      name='username'
                      onChange={updateUsername}
                      value={username}
                      placeholder="Username"
                    ></input>
                  </div>
                  <div>
                    <label className='signup-label'>Email</label>
                    <input
                      className='s-input'
                      type='text'
                      name='email'
                      onChange={updateEmail}
                      value={email}
                      placeholder='Email'
                    ></input>
                  </div>
                  <div>
                    <label className='signup-label'>Password</label>
                    <input
                      className='s-input'
                      type='password'
                      name='password'
                      onChange={updatePassword}
                      value={password}
                      placeholder='Password'
                    ></input>
                  </div>
                  <div>
                    <label className='signup-label'>Repeat Password</label>
                    <input
                      className='s-input'
                      type='password'
                      name='repeat_password'
                      onChange={updateRepeatPassword}
                      value={repeatPassword}
                      required={true}
                      placeholder='Confirm Password'
                    ></input>
                  </div>
                  <div id='disclaimer'>
                    <p className='disc-text'>By signing up, you agree to our Terms, Data Policy, and Cookies Policy.</p>
                  </div>
                  {/* <div>
                      {errors.map((error, ind) => (
                        <div id='errors' key={ind}>{error}</div>
                      ))}
                  </div> */}
                  <button
                    disabled={
                      !full_name ||
                      !username ||
                      !email ||
                      !password ||
                      !repeatPassword
                    }
                    type='submit'
                    className='s-button'
                    id="signupBtn">Sign Up</button>
                    <div>
                      {errors.map((error, ind) => (
                        <div id='errors' key={ind}>{error}</div>
                      ))}
                    </div>
                </form>
              </div>

              </div>
          </div>

          <div className='login-container'>
            <p id='s-text'>Have an account? <a id='login-link' href='/login'>Log in</a></p>
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
          <p className='c-name'>© 2022 Pixtagram</p>
            <p className='c-name'>Agustin Zucca</p>
            <p className='c-name'>Anthony Bronca</p>
            <p className='c-name'>Briana Robinson</p>
            <p className='c-name'>Maica Santos</p>
        </div>
      </div>



    </>
  );
};

export default SignUpForm;
