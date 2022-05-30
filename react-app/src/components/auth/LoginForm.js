import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

// ms-comment may-30

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

  return (
    <>
      <div id='full-page-container'>
        <div id='top-page-container'>

          <div className='left-container'>
            {/* Image of more pictures to come. Could be macbook with pixtagram loaded on it */}
          </div>

          <div id='right-container'>
            <div id='heading-div'>
              <h1 id='heading-text'>Pixtagram</h1>
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
                <button id='login-button' type='submit'>Login</button>
                    <div>
                      {errors.map((error, ind) => (
                        <div id='errors' key={ind}>{error}</div>
                      ))}
                    </div>
              </form>
            </div>
              <div className='l-or-divider'>
                <div className='l-line'></div>
                <div id='or'> OR </div>
                <div className='l-line'></div>
              </div>
              <div className='l-demo-div'>
                <button id='l-demo-button'>Log in as a Demo User</button>
              </div>

              <div id='b-line'></div>

              <div id='l-signup-div'>
                <p id='l-text'>Don't have an account? <a id='s-link' href='/sign-up'>Sign Up</a></p>
              </div>
          </div>
        </div>

        <div id='footer'>
          <p>Python</p>
          <p>Javascript</p>
          <p>React</p>
          <p>Redux</p>
          <p>Flask</p>
          <p>SQLAlchemy</p>
        </div>

        <div id='creators'>
          <p>© 2022 Pixtagram</p>
            <p className='c-name'>Agustin Zucca</p>
            <p className='c-name'>Anthony Bronca</p>
            <p className='c-name'>Briana Robinson</p>
            <p className='c-name'>Maica Santos</p>
        </div>
      </div>


    </>
  );
};

export default LoginForm;
