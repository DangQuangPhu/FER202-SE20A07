import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { validateLogin } from '../utils/validate';
import '../styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validationError = validateLogin(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Fetch by email only to avoid json-server numeric string coercion bug on password
      const response = await api.get(`/users?email=${email}`);
      const users = response.data;

      const matchedUser = users.find(u => u.password === password);

      if (matchedUser) {
        dispatch({ type: 'LOGIN', payload: matchedUser });
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card card shadow-lg p-4">
        <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
        
        {error && <div className="alert alert-danger py-2">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="student01@fpt.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;