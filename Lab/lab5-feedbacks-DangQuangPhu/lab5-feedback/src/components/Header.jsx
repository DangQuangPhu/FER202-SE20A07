import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/image.jpg';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-4 py-2">
        <span className="navbar-brand fw-bold d-flex align-items-center">
          <img 
            src={logo} 
            alt="Logo" 
            width="30" 
            height="30" 
            className="d-inline-block align-text-top me-2"
          />
          Course Management System
        </span>
        <div className="d-flex align-items-center">
          {user && (
            <>
              <span className="text-dark me-3">
                Signed in as <strong>{user.fullName}</strong>
              </span>
              <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;