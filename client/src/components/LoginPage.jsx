import React, { useState } from 'react';
import picture from '../assets/login-page-img.png';
import picture2 from '../assets/sign-page.png';
import api from '../utils/api';

const LoginPage = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      // FIX: Ensure we extract a string, even if the server sends an object
      const errorMsg = err.response?.data?.message || err.response?.data || 'Login failed';
      
      // If it's still an object (rare edge case), force it to a string
      if (typeof errorMsg === 'object') {
        setError(JSON.stringify(errorMsg));
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className='container'>
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to Lexora</p>
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary full-width">Login</button>
        </form>
        
        <p className="auth-switch">
          Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span>
        </p>
      </div>
      <div className="auth-image signup-image">
              <img src={picture} alt="auth-image" className="signup-image_2" />
            </div>
            <div className="auth-image">
              <img src={picture2} alt="auth-image" className="signup-mobile" />
            </div>
      </div>
    </div>
  );
};

export default LoginPage;