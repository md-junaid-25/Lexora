import React, { useState } from 'react';
import picture from '../assets/login-page-img.png';
import picture2 from '../assets/sign-page.png';
import api from '../utils/api';

const SignupPage = ({ onLogin, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      // FIX: Safer error handling
      const errorMsg = err.response?.data?.message || err.response?.data || 'Registration failed';
      
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
        <h2>Create Account</h2>
        <p>Join Lexora Today</p>
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary full-width">Sign Up</button>
        </form>
        
        <p className="auth-switch">
          Already have an account? <span onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
      <div className="auth-image signup-image">
        <img src={picture} alt="auth-image" className="signup-image" />
      </div>
      <div className="auth-image">
        <img src={picture2} alt="auth-image" className ="signup-mobile" />
      </div>
      </div>
    </div>
  );
};

export default SignupPage;