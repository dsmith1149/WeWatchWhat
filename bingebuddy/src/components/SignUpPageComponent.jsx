import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../App.css';

const SignUpPageComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [dor, setDateOfRegistration] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    
  const handleRegistration = async () => {
    try {
      const userData = {
        email,
        password,
        confirmPassword,
        userName,
        dor
      };
    

    console.log('User registered:');

    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationSuccess(true);
  }

  if (registrationSuccess) {
    return (
    <div className='centered-container'>
      <div className="login-container">
      <h1>Registered successfully</h1>
      <p>Click to enter <a href="/add-user">your details</a></p>
      </div>

    </div>);
  }

  return (
    <div className="container login-container">
        <div className="login-form">
            <h2 className="text-center header">Create BingeBuddy Account</h2>
            
            <div className="input-container">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="password" placeholder="Confirm Password" value={password} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="date" placeholder="Date of Registration" value={dor} onChange={(e) => setDateOfRegistration(e.target.value)} />
            </div>
            <button className="btn btn-primary mb-2 login-button" onClick={handleRegistration}>SignUp</button>
            <div className="login-link">
                <p className='registration-link'>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>

    </div>
  )
}

export default SignUpPageComponent